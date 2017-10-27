import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import "./Instances.css";
import InstanceSelect from "../components/InstanceSelect";
import * as blueGreenActions from "../actions/blueGreenActions";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import * as messageBoxActions from "../actions/messageBoxActions";

class InstancesContainer extends Component {
  constructor(props) {
    super(props);

    this.handleInstanceId = this.handleInstanceId.bind(this);
  }

  handleInstanceId(event) {
    this.props.dispatch(
      messageBoxActions.message(
        "Registering target " + this.props.instanceToDeploy
      )
    );

    this.props.onDeployClick(this.props.instanceToDeploy, this.props.deployed);
  }

  // Filter the AMI instances we want.
  instanceFilters() {
    return [
      {
        Name: "instance-state-name",
        Values: ["running"]
      }
    ];
  }

  render() {
    return (
      <div>
        <Row className="instance">
          <Col xs={12} md={12}>
            <InstanceSelect
              onSelectHandler={this.handleInstanceId}
              updateParent={() => {}}
              uniqueId="deployCandidates"
              filters={this.instanceFilters()}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={9} />
          <Col xs={3} md={3}>
            <Button onClick={this.handleInstanceId} className="deploy-button">
              Deploy Now
            </Button>
          </Col>
          <Col xs={2} md={2} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    instances: state.bluegreen.instances,
    deployed: state.bluegreen.deployed,
    instanceToDeploy: state.instanceSelect.deployCandidates.toDeploy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    onDeployClick: (instanceId, deployed) => {
      dispatch(blueGreenActions.deployInstance(dispatch, instanceId, deployed));
    }
  };
};

const Instances = connect(mapStateToProps, mapDispatchToProps)(
  InstancesContainer
);
export default Instances;
