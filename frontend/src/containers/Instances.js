import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import "./Instances.css";
import * as blueGreenActions from "../actions/blueGreenActions";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import * as messageBoxActions from "../actions/messageBoxActions";
import ErrorView from "./common-views/error";
import LoadingView from "./common-views/loading";
import InstancesGrid from "./instances-views/view.js";

// Choose state to display.
const StateToDisplay = state => {
  if (state.loading) {
    return <LoadingView />;
  } else if (state.instances) {
    const filters = [
      {
        Name: "instance-state-name",
        Values: ["running"]
      }
    ];

    return <InstancesGrid {...state} filters={filters} />;
  } else {
    return <ErrorView {...state} />;
  }
};

class InstancesView extends Component {
  constructor() {
    super();

    this.handleInstanceId = this.handleInstanceId.bind(this);
    this.deployInstance = this.deployInstance.bind(this);
  }

  // Get initial values.
  componentDidMount() {
    const filters = this.props.filters;
    this.props.dispatch(
      instanceSelectActions.fetchInstances(
        "us-east-1",
        this.props.namespace,
        filters
      )
    );

    this.props.dispatch(
      instanceSelectActions.fetchDeployed(this.props.namespace)
    );
  }

  deployInstance(event) {
    this.props.dispatch(
      blueGreenActions.deployInstance(
        this.props.dispatch,
        this.props.instanceToDeploy,
        this.props.deployed
      )
    );
  }

  handleInstanceId(event) {
    this.props.dispatch(
      messageBoxActions.message(
        "Registering target " + this.props.instanceToDeploy,
        "blueGreen"
      )
    );

    this.props.dispatch(messageBoxActions.clear("blueGreen"));
    if (
      this.props.instanceToDeploy !== "" &&
      this.props.instanceToDeploy !== this.props.deployed.instanceId
    ) {
      this.deployInstance(this.props.instanceToDeploy, this.props.deployed);
    } else {
      this.props.dispatch(
        messageBoxActions.message("Nothing to do.", "blueGreen")
      );
    }
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
    return <StateToDisplay {...this.props} />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.instanceSelect[props.namespace].loading,
    instances: state.instanceSelect[props.namespace].instances,
    error: state.instanceSelect[props.namespace].error,
    deployed: state.instanceSelect[props.namespace].deployed,
    instanceToDeploy: state.instanceSelect[props.namespace].toDeploy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const InstancesContainer = connect(mapStateToProps, mapDispatchToProps)(
  InstancesView
);
export default InstancesContainer;
