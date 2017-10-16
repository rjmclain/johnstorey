import React, { Component } from "react";
import { connect } from "react-redux";
import "./Instances.css";
import { Button } from "react-bootstrap";
import * as blueGreenActions from "../actions/blueGreenActions";

class InstancesContainer extends Component {

  componentDidMount() {
    this.props.dispatch(blueGreenActions.fetchInstances());
  }

  render() {
    return (
      <div>
        { this.props.instances.map( (instance) => {
            return (
              <Button
              key={ instance.instanceId }
              onClick={ () => { this.props.onDeployClick(instance.instanceId,
                this.props.deployed) }} >
              { instance.instanceId }
            </Button>
         );
        })}
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