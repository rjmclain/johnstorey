import React, { Component } from "react";
import { connect } from "react-redux";
import "./Instances.css";
import { Button } from "react-bootstrap";
import * as blueGreenActions from "../actions/blueGreenActions";
import InstanceSelect from "../components/InstanceSelect";

class InstancesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleInstanceId = this.handleInstanceId.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(blueGreenActions.fetchInstances());
  }

  handleInstanceId(event) {
    this.props.onDeployClick(event.target.value, this.props.deployed);
  }

  render() {
    return (
      <div>
        <InstanceSelect
          onSelectHandler={ this.handleInstanceId }
          uniqueId="deployCandidates" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    instances: state.bluegreen.instances,
    deployed : state.bluegreen.deployed
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    onDeployClick: (instanceId, deployed) => {
      dispatch(blueGreenActions.deployInstance(instanceId, deployed));
    }
  }
}

const Instances = connect(mapStateToProps,mapDispatchToProps)(InstancesContainer);
export default Instances;