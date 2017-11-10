import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import MessageBox from "../containers/MessageBox";
import * as messageBoxActions from "../actions/messageBoxActions";
import * as amiSelectActions from "../actions/amiSelectActions";
import QuestionModal from "./QuestionModal";
import RegionsSelect from "./RegionsSelect";
import AMISelect from "./AMISelect";
import * as waitFor from "../containers/waitFor";
import config from "../config";
import * as awsHelpers from "../libs/awsHelpers";

class StartInstancePresentation extends Component {
  constructor(props) {
    super(props);

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onPositiveResponse = this.onPositiveResponse.bind(this);
    this.onNegativeResponse = this.onNegativeResponse.bind(this);
    this.handleRegionUpdate = this.handleRegionUpdate.bind(this);
    this.amiFilters = this.amiFilters.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleVersion = this.handleVersion.bind(this);

    this.state = {
      componentDidMount: false,
      showWarning: false,
      region: "us-east-1",
      name: "",
      description: "",
      version: ""
    };
  }

  onHandleSubmit(e) {
    this.setState({ showWarning: true });
  }

  async onPositiveResponse(e) {
    this.setState({ showWarning: false });

    this.props.dispatch(
      messageBoxActions.message("Starting new instance.", "startInstance")
    );

    // Get AMI data for any version data.
    const image = await awsHelpers.describeImage(
      this.state.region,
      this.props.currentAMI,
      []
    );

    // Trigger instance start.
    const instance = await awsHelpers.startInstance(
      this.state.region,
      this.props.currentAMI,
      config.ec2.INSTANCE_SIZE,
      config.ec2.SUBNET_ID,
      this.state.name,
      this.state.description,
      awsHelpers.findTag("Version", image.Images[0].Tags)
    );

    const instanceId = instance.Instances[0].InstanceId;
    this.props.dispatch(
      messageBoxActions.message(
        "New instance id is " +
          instanceId +
          ". Waiting for it to become available.",
        "startInstance"
      )
    );

    const waitForResponse = await waitFor.instanceAvailable(
      instanceId,
      this.state.region
    );

    let resultMessage = "";
    waitForResponse.status === "false"
      ? (resultMessage =
          "WARNING: Instance " + instanceId + " failed to become 'running'.")
      : (resultMessage =
          "Instance " + instanceId + " is now in state 'running'.");

    this.props.dispatch(
      messageBoxActions.message(resultMessage, "startInstance")
    );
  }

  onNegativeResponse(e) {
    this.setState({ showWarning: false });
  }

  handleRegionUpdate(event) {
    this.props.dispatch(
      messageBoxActions.message("Fetching images.", "startInstance")
    );

    this.setState({ region: event.target.value });

    this.props.dispatch(
      amiSelectActions.fetchAMIs(
        event.target.value,
        "startInstance_amis",
        this.amiFilters()
      )
    );
  }

  componentDidMount() {
    this.setState({ componentDidMount: true });

    messageBoxActions.clear("startInstance");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  amiFilters() {
    return [
      {
        Name: "state",
        Values: ["available"]
      }
    ];
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleVersion(event) {
    this.setState({ version: event.target.value });
  }

  render() {
    let modal = null;
    if (this.state.showWarning === true) {
      modal = (
        <QuestionModal
          header="Warning"
          body="Do you really want to start an instance on AWS?"
          positive="Yes"
          onPositiveResponse={this.onPositiveResponse}
          negative="No"
          onNegativeResponse={this.onNegativeResponse}
        />
      );
    }

    let amiSelectPlaceholder = "No AMIs available.";
    if (this.state.componentDidMount === true) {
      amiSelectPlaceholder = (
        <AMISelect filters={this.amiFilters()} uniqueId="startInstance_amis" />
      );
    }

    return (
      <span>
        {modal}
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4} mdPush={2}>
              Region
            </Col>
            <Col xs={12} md={6}>
              <RegionsSelect onSelectHandler={this.handleRegionUpdate} />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} md={4} mdPush={2} />
            <Col xs={12} md={6}>
              {amiSelectPlaceholder}
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} md={4} mdPush={2}>
              Name
            </Col>
            <Col xs={12} md={6}>
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleName}
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} md={4} mdPush={2}>
              Version Tag
            </Col>
            <Col xs={12} md={6}>
              <input
                type="text"
                value={this.state.version}
                onChange={this.handleVersion}
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={0} md={4} mdPush={2} />
            <Col xs={12} md={4} mdPush={2}>
              <Button onClick={e => this.onHandleSubmit(e)}>Create</Button>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <MessageBox uniqueId="startInstance" />
            </Col>
          </Row>
        </Grid>
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentAMI: state.amiSelect.startInstance_amis_currentAMI
  };
};

// mapDispatchToState() {
//   return {
//     dispatch: dispatch,
//   };
// }

const StartInstance = connect(mapStateToProps)(StartInstancePresentation);
export default StartInstance;
