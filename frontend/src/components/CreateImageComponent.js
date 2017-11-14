import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import RegionsSelect from "./RegionsSelect";
import InstanceSelect from "./InstanceSelect";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import MessageBox from "../containers/MessageBox";
import * as messageBoxActions from "../actions/messageBoxActions";
import * as blueGreenActions from "../actions/blueGreenActions";
import * as waitFor from "../containers/waitFor";
import * as awsHelpers from "../libs/awsHelpers";

class CreateImageComponentPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: "us-east-1",
      name: "",
      instanceId: ""
    };

    this.handleInstanceId = this.handleInstanceId.bind(this);
    this.handleInstanceSelectChanged = this.handleInstanceSelectChanged.bind(
      this
    );
    this.handleName = this.handleName.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // This only works without real logic because text boxes are not controlled.
    return false;
  }

  componentDidMount() {
    this.props.dispatch(messageBoxActions.clear("createImage"));
    this.props.dispatch(blueGreenActions.fetchDeployed());
  }

  handleInstanceId(event) {
    this.props.dispatch(
      messageBoxActions.message(
        "Instance id " + event.target.value + " chosen.",
        "createImage"
      )
    );

    this.setState({ instanceid: event.target.value });
  }

  handleInstanceSelectChanged(instanceId) {
    this.props.dispatch(
      messageBoxActions.message(
        "Instance id " + instanceId + " chosen.",
        "createImage"
      )
    );

    this.setState({ instanceId: instanceId });
  }

  handleRegion(event) {
    this.props.dispatch(
      messageBoxActions.message("Fetching instances", "createImage")
    );

    this.props.dispatch(
      instanceSelectActions.fetchInstances(
        event.target.value,
        "createimage_instances",
        this.instanceFilters()
      )
    );
    this.setState({ region: event.target.value });
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  async handleSubmit(event) {
    // Verify we have the necessary data.
    if (this.state.instanceId === "" || this.state.name === "") {
      this.props.dispatch(
        messageBoxActions.message(
          "We require both an instance and name before we can proceed.",
          "createImage"
        )
      );
      return;
    }

    // Guard against stopping the currently deployed instance.
    if (
      this.props.deployed.length !== 0 &&
      this.props.deployed[0].instanceId === this.state.instanceId
    ) {
      this.props.dispatch(
        messageBoxActions.message(
          "Sorry! We cannot change the deployed instance. Please choose another.",
          "createImage"
        )
      );
      return;
    }

    this.props.dispatch(
      messageBoxActions.message(
        "Stopping instance " +
          this.state.instanceId +
          ". This will take awhile.",
        "createImage"
      )
    );

    awsHelpers.stopInstance(this.state.region, this.state.instanceId);

    const instanceStopped = await waitFor.waitForStopped(
      this.state.instanceId,
      this.state.region
    );

    const stoppedInstanceVersionTag = awsHelpers.findTag(
      "Version",
      instanceStopped.instance.Tags
    );

    this.props.dispatch(
      messageBoxActions.message(
        "Creating image of instance " + this.state.instanceId,
        "createImage"
      )
    );

    const createImageResult = await awsHelpers.createImage(
      this.state.region,
      this.state.instanceId,
      this.state.name
    );

    this.props.dispatch(
      messageBoxActions.message(
        "Creating image with AMI ID of " +
          createImageResult.ImageId +
          ". Will notify here when image is available."
      )
    );

    const waitForImageResult = await waitFor.waitForImageAvailable(
      createImageResult.ImageId,
      this.state.region
    );

    let resultMessage = "";
    waitForImageResult.status === "false"
      ? (resultMessage =
          "WARNING: Image " +
          createImageResult.ImageId +
          " failed to become available.")
      : (resultMessage =
          "Image " + createImageResult.ImageId + " is now in state available.");

    this.props.dispatch(
      messageBoxActions.message(resultMessage, "createImage")
    );

    // Add tracking tags.
    if (waitForImageResult !== "false") {
      awsHelpers.createTags(this.state.region, createImageResult.ImageId, [
        {
          Key: "source-instance-id",
          Value: this.state.instanceId
        },
        {
          Key: "source-region",
          Value: this.state.region
        },
        {
          Key: "Version",
          Value: stoppedInstanceVersionTag
        }
      ]);
    }

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
    // <InstanceSelect
    //   onselecthandler={this.handleinstanceid}
    //   updateparent={this.handleinstanceselectchanged}
    //   filters={this.instancefilters()}
    //   uniqueid="createimage_instances"
    //   region={this.state.region}
    // />
    return (
      <Grid>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={12} md={2}>
              Region
            </Col>
            <Col xs={12} md={10}>
              <RegionsSelect onSelectHandler={this.handleRegion} />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={10}>
              // INSTANCESELECT HERE.
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={2}>
              Name
            </Col>
            <Col xs={12} md={10}>
              <input type="text" onChange={this.handleName} />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <Button onClick={this.handleSubmit}>Create</Button>
            </Col>
          </Row>

          <Row>
            <MessageBox uniqueId="createImage" />
          </Row>
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // TODO: Replace
    //deployed: state.bluegreen.deployed
  };
};

const mapDispatchToProps = dispatch => {
  return { dispatch: dispatch };
};

const CreateImageComponent = connect(mapStateToProps, mapDispatchToProps)(
  CreateImageComponentPresentation
);
export default CreateImageComponent;
