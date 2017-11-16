import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import RegionsSelect from "../../components/RegionsSelect";
import InstanceSelect from "../../components/InstanceSelect";
import * as instanceSelectActions from "../../actions/instanceSelectActions";
import MessageBox from "../../components/MessageBox";
import * as messageBoxActions from "../../actions/messageBoxActions";
import * as waitFor from "../../components/waitFor";
import * as awsHelpers from "../../libs/awsHelpers";

const namespace = "createImage";

class ViewPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: "us-east-1",
      name: "",
      instanceId: ""
    };

    this.handleName = this.handleName.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stopInstance = this.stopInstance.bind(this);
    this.createAMI = this.createAMI.bind(this);
    this.message = this.message.bind(this);
  }

  handleRegion(event) {
    this.message("Fetching instances", "createImage");

    this.props.dispatch(
      instanceSelectActions.fetchInstances(
        event.target.value,
        namespace,
        this.instanceFilters()
      )
    );
    this.setState({ region: event.target.value });
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  async handleSubmit(event) {
    // Stop the instance before imaging.
    const { stopResult, versionTag } = await this.stopInstance();

    // Image the instance.
    if (stopResult !== false) {
      const { imageResult, imageId } = await this.createAMI();

      // Tag the image.
      if (imageResult !== "false") {
        this.addTags(
          this.state.region,
          imageId,
          this.props.toDeploy,
          versionTag
        );
      }
    }
    event.preventDefault();
  }

  // Create an AMI from an instance.
  async createAMI() {
    this.message(
      "Creating image of instance " + this.props.toDeploy,
      "createImage"
    );

    const createImageResult = await awsHelpers.createImage(
      this.state.region,
      this.props.toDeploy,
      this.state.name
    );

    this.message(
      "Creating image with AMI ID of " +
        createImageResult.ImageId +
        ". Will notify here when image is available."
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

    this.message(resultMessage, namespace);

    return {
      imageResult: waitForImageResult,
      imageId: createImageResult.ImageId
    };
  }

  // Stop the specified instance
  async stopInstance() {
    // Verify we have the necessary data.
    if (this.props.toDeploy === "" || this.state.name === "") {
      this.message(
        "We require both an instance and name before we can proceed.",
        "createImage"
      );

      return {
        stopResult: false,
        versionTag: 0
      };
    }

    // Guard against stopping the currently deployed instance.
    if (this.props.isDeployed === this.props.toDeploy) {
      this.message(
        "Sorry! We cannot change the deployed instance. Please choose another.",
        "createImage"
      );

      return {
        stopResult: false,
        versionTag: 0
      };
    }

    this.message(
      "Stopping instance " + this.state.instanceId + ". This will take awhile.",
      "createImage"
    );

    awsHelpers.stopInstance(this.state.region, this.props.toDeploy);

    const instanceStopped = await waitFor.waitForStopped(
      this.props.toDeploy,
      this.state.region
    );

    const stoppedInstanceVersionTag = awsHelpers.findTag(
      "Version",
      instanceStopped.instance.Tags
    );

    return {
      stopResult: true,
      versionTag: stoppedInstanceVersionTag
    };
  }

  // Add tags created AMI.
  addTags(region, imageId, instanceId, versionTag) {
    awsHelpers.createTags(this.state.region, imageId, [
      {
        Key: "source-instance-id",
        Value: instanceId
      },
      {
        Key: "source-region",
        Value: region
      },
      {
        Key: "Version",
        Value: versionTag
      }
    ]);
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

  // Display a message to the user.
  message(message) {
    this.props.dispatch(messageBoxActions.message(message, namespace));
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
              <RegionsSelect onSelectHandler={this.handleRegion} />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={10}>
              <InstanceSelect
                onselecthandler={this.handleinstanceid}
                updateparent={this.handleinstanceselectchanged}
                filters={this.instanceFilters()}
                namespace={namespace}
                region={this.state.region}
              />
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
            <MessageBox uniqueId={namespace} />
          </Row>
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    instances: state.instanceSelect[namespace].instances,
    toDeploy: state.instanceSelect[namespace].toDeploy,
    isDeployed: state.instanceSelect[namespace].isDeployed
  };
};

const mapDispatchToProps = dispatch => {
  return { dispatch: dispatch };
};

const CreateImageContainer = connect(mapStateToProps, mapDispatchToProps)(
  ViewPresentation
);
export default CreateImageContainer;
