import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import MessageBox from "../containers/MessageBox";
import * as messageBoxActions from "../actions/messageBoxActions";
import * as amiSelectActions from "../actions/amiSelectActions";
import QuestionModal from "./QuestionModal";
import RegionsSelect from "./RegionsSelect";
import AMISelect from "./AMISelect";
import { invokeApig } from "../libs/awsLib";
import * as waitFor from "../containers/waitFor";

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
      amiId: "",
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

    this.props.dispatch(messageBoxActions.message("Starting new instance."));

    // Trigger instance start.
    const invokeResponse = await invokeApig({
      path: "/run-instance",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {
        region: this.state.region,
        imageId: this.props.currentAMI,
        instanceSize: "t2.micro",
        subnetId: "subnet-2978cc15",
        instanceName: this.state.name,
        description: this.state.description,
        version: this.state.version
      }
    });

    console.log("invokeResponse", invokeResponse);
    const instanceId = invokeResponse.Instances[0].InstanceId;
    this.props.dispatch(
      messageBoxActions.message(
        "New instance id is " +
          instanceId +
          ". Waiting for it to become available."
      )
    );

    const waitForResponse = await waitFor.instanceAvailable(
      instanceId,
      this.state.region
    );

    console.log("waitForResponse", waitForResponse);

    let resultMessage = "";
    waitForResponse.status === "false"
      ? (resultMessage =
          "WARNING: Instance " + instanceId + " failed to become 'running'.")
      : (resultMessage =
          "Instance " + instanceId + " is now in state 'running'.");

    this.props.dispatch(messageBoxActions.message(resultMessage));
  }

  onNegativeResponse(e) {
    this.setState({ showWarning: false });
  }

  handleRegionUpdate(event) {
    this.props.dispatch(messageBoxActions.message("Fetching images."));

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

    messageBoxActions.clear();
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
            <Col xs={12} md={4} mdPush={2}>
              AMI
            </Col>
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
              Size
            </Col>
            <Col xs={12} md={6}>
              t2.micro
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} md={4} mdPush={2}>
              Subnet
            </Col>
            <Col xs={12} md={6}>
              subnet-2978cc15
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} md={4} mdPush={2}>
              Description
            </Col>
            <Col xs={12} md={6}>
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleDescription}
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
              Status
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <MessageBox />
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
