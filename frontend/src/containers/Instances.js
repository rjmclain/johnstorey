import React, { Component } from "react";
import { connect } from "react-redux";
import "./Instances.css";
import * as blueGreenActions from "../actions/blueGreenActions";
import * as messageBoxActions from "../actions/messageBoxActions";
import InstanceSelect from "../components/InstanceSelect";

class InstancesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleInstanceId = this.handleInstanceId.bind(this);
  }

  handleInstanceId(event) {
    this.props.dispatch(
      messageBoxActions.message("Registering target "
        + event.target.value));

    this.props.onDeployClick(event.target.value, this.props.deployed);
  }

  // Filter the AMI instances we want.
  instanceFilters() {
    return [ 
      {
        Name: "instance-state-name",
        Values: [ "running" ]
      }
    ];
  } 

  render() {
    return (
      <div>
        <InstanceSelect
          onSelectHandler={ this.handleInstanceId }
          updateParent={ () => {} }
          uniqueId="deployCandidates"
          filters={ this.instanceFilters() }
          />
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
      dispatch(blueGreenActions.deployInstance(dispatch, instanceId, deployed));
    }
  }
}

const Instances = connect(mapStateToProps,mapDispatchToProps)(InstancesContainer);
export default Instances;