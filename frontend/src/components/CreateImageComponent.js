import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { invokeApig } from "../libs/awsLib";
import RegionsSelect from "./RegionsSelect";
import InstanceSelect from "./InstanceSelect";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import * as messageBoxActions from "../actions/messageBoxActions";

class CreateImageComponentPresentation extends Component {

  constructor(props) {
    super(props);

    this.handleInstanceId = this.handleInstanceId.bind(this);
    this.handleInstanceSelectChanged = this.handleInstanceSelectChanged.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      messageBoxActions.clear()
    );
  }

  handleInstanceId(event) {
    this.props.dispatch(messageBoxActions.message(
      "Instance id " + event.target.value + " chosen."));

    this.setState({ instanceid: event.target.value });
  }

  handleInstanceSelectChanged(instanceId) {
    this.props.dispatch(messageBoxActions.message(
      "Instance id " + instanceId + " chosen."));

    this.setState({ instanceid: instanceId });
  }

  handleRegion(event) {
    this.props.dispatch(messageBoxActions.message("Fetching instances"));

    this.props.dispatch(instanceSelectActions.fetchInstances(
      event.target.value,
      'createimage_instances'
    ))
    this.setState({ region: event.target.value });
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  async handleSubmit(event) {
    this.props.dispatch(
      messageBoxActions.message(
        "Stopping instance " + this.state.instanceid
        + ". This will take awhile."));

    let stopResults = invokeApig({
      path: "/stop-instance",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {
        instanceId: this.state.instanceid,
    }});

    stopResults.then((data) => {

    sleep(180000)
      .then( () => {


    this.props.dispatch(messageBoxActions.message(
      "Creating image of instance " + this.state.instanceid));

  let createImage = invokeApig({
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

  createImage.then((data) => {
    this.props.dispatch(messageBoxActions.message(
      "Creating image with AMI ID of ", data.ImageId ));
  });

  createImage.catch( (err) => { console.log("createImage err", err); });
});

  stopResults.catch( (err) => { console.log("stopResults err", err); });

      });

event.preventDefault();
}

  render() {
    return (
    <span>

        <form onSubmit={ this.handleSubmit }>

      <div className="row">
        <span align="center" className="col-lg-2">
          Region
        </span>
        <span align="center" className="col-lg-10">
          <RegionsSelect onSelectHandler={ this.handleRegion } />
        </span>
      </div>

      <div className="row">
        <span align="center" className="col-lg-2">
          Instance Id
        </span>
        <span align="center" className="col-lg-6">
          <InstanceSelect
            onSelectHandler={ this.handleInstanceId }
            updateParent={ this.handleInstanceSelectChanged }
            uniqueId="createimage_instances"
          />
        </span>
        
        <span align="center" className="col-lg-2">
          <Button onClick={ this.handleSubmit }>Create</Button>
        </span>
      </div>

      <div className="row">
        <span align="center" className="col-lg-2">
          Name
        </span>
        <span align="center" className="col-lg-10">
          <input type="text"
            onChange={ this.handleName } />
        </span>
      </div>

      <div className="row">
        <span className="col-lg-2">
          Description
        </span>
        <span className="col-lg-10">
          <input type="text" 
            onChange={ this.handleDescription } />
        </span>

      </div>
        </form>
    </span>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mapStateToProps = (state, ownProps) => {
  const newProps = {};
  return newProps;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
}

const CreateImageComponent = connect(mapStateToProps,mapDispatchToProps)(CreateImageComponentPresentation);
export default CreateImageComponent;