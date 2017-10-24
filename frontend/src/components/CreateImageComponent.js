import React, {Component} from "react";
import {connect} from "react-redux";
import { Grid, Row, Col, Button} from "react-bootstrap";
import {invokeApig} from "../libs/awsLib";
import RegionsSelect from "./RegionsSelect";
import InstanceSelect from "./InstanceSelect";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import * as messageBoxActions from "../actions/messageBoxActions";
import * as waitFor from "../containers/waitFor";

class CreateImageComponentPresentation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: "us-east-1",
    };

    this.handleInstanceId = this
      .handleInstanceId
      .bind(this);
    this.handleInstanceSelectChanged = this
      .handleInstanceSelectChanged
      .bind(this);
    this.handleDescription = this
      .handleDescription
      .bind(this);
    this.handleName = this
      .handleName
      .bind(this);
    this.handleRegion = this
      .handleRegion
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // This only works without real logic because text boxes are not controlled.
    return false;
  }

  componentDidMount() {
    this
      .props
      .dispatch(messageBoxActions.clear());
  }

  handleInstanceId(event) {
    this
      .props
      .dispatch(messageBoxActions.message("Instance id " + event.target.value + " chosen."));

    this.setState({instanceid: event.target.value});
  }

  handleInstanceSelectChanged(instanceId) {
    this
      .props
      .dispatch(messageBoxActions.message("Instance id " + instanceId + " chosen."));

    this.setState({instanceid: instanceId});
  }

  handleRegion(event) {
    this
      .props
      .dispatch(messageBoxActions.message("Fetching instances"));

    this
      .props
      .dispatch(instanceSelectActions.fetchInstances(event.target.value, 'createimage_instances', this.instanceFilters()))
    this.setState({region: event.target.value});
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleDescription(event) {
    this.setState({description: event.target.value});
  }

  async handleSubmit(event) {
    this
      .props
      .dispatch(messageBoxActions.message("Stopping instance "
        + this.state.instanceid + ". This will take awhile."));

    let stopResults = invokeApig({
      path: "/stop-instance",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {
        instanceId: this.state.instanceid
      }
    });

    let stopResult = await waitFor.waitForStopped(this.state.instanceid,
      this.state.region);

      this
        .props
        .dispatch(messageBoxActions.message("Creating image of instance " 
          + this.state.instanceid));

      let createImageResult = await invokeApig({
        path: "/create-image",
        method: "POST",
        headers: {},
        queryParams: {},
        body: {
          instanceId: this.state.instanceid,
          amiName: this.state.name,
          amiDescription: this.state.description,
          region: this.state.region
        }
      });

      this
        .props
        .dispatch(messageBoxActions.message("Creating image with AMI ID of "
          + createImageResult.ImageId
          + ". Will notify here when image is available."));

      const waitForImageResult =
        await waitFor.waitForImageAvailable(createImageResult, this.state.region);

        console.log('CreateImageComponent waitForImageResult',
        waitForImageResult);

      let resultMessage = "";
      (waitForImageResult.status === "false")
        ? resultMessage = "WARNING: Image " + this.state.instance.id + " failed to become available."
        : resultMessage = "Image "
          + this.state.instanceid + " is now in state available.";

      this
        .props
        .dispatch(messageBoxActions.message(resultMessage));

    event.preventDefault();
  }

  // Filter the AMI instances we want.
  instanceFilters() {
    const filters = [
      {
        Name: "instance-state-name",
        Values: ["running", "stopped"]
      }
    ];
    return filters;
  }

  render() {
    return (
      <Grid>
        <form onSubmit={this.handleSubmit}>

          <Row>
            <Col xs={12} md={2}>
              Region
            </Col>
            <Col xs={12} md={10}>
              <RegionsSelect onSelectHandler={this.handleRegion}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={2}>
              Instance Id
            </Col>
            <Col xs={12} md={10}>
              <InstanceSelect
                onSelectHandler={this.handleInstanceId}
                updateParent={this.handleInstanceSelectChanged}
                filters={this.instanceFilters()}
                uniqueId="createimage_instances"/>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={2}>
              Name
            </Col>
            <Col xs={12} md={10}>
              <input type="text" onChange={this.handleName}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={2}>
              Description
            </Col>
            <Col xs={12} md={10}>
              <input type="text" onChange={this.handleDescription}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <Button onClick={this.handleSubmit}>Create</Button>
            </Col>
          </Row>
        </form>
      </Grid> 
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const newProps = {};
  return newProps;
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch: dispatch}
}

const CreateImageComponent = connect(mapStateToProps, mapDispatchToProps)(CreateImageComponentPresentation);
export default CreateImageComponent;