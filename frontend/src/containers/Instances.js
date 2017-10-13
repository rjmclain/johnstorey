import React, { Component } from "react";
import { connect } from "react-redux";
import "./Instances.css";
import config from "../config";
import { Button } from "react-bootstrap";
import * as blueGreenActions from "../actions/blueGreenActions";
import * as eventTypes from "../constants/eventTypes";

class InstancesContainer extends Component {

  componentDidMount() {
    this.props.dispatch(blueGreenActions.blueGreenFetchInstances());
  }

  render() {
    return (
      <div>
        { this.props.instances.map( (instance) => {
            return (
              <Button
              key={ instance.instanceId }
              onClick={ this.props.onDeployClick(instance.instanceId) } >
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
    instances: state.bluegreen.instances
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    onDeployClick: (e) => {
      dispatch({
        type: eventTypes.BLUEGREEN_DEPLOY_INSTANCE,
        value: e
      });
    }
  }
}

const Instances = connect(mapStateToProps,mapDispatchToProps)(InstancesContainer);
export default Instances;