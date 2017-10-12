import React, { Component } from "react";
import { connect } from "react-redux";
import "./Instances.css";
import config from "../config";
import { Button } from "react-bootstrap";
import { invokeApig } from "../libs/awsLib";
import * as eventTypes from "../constants/eventTypes";

class InstancesContainer extends Component {

  render() {
    return (
        <Button
           key={ this.props.instances.id }
           onClick={ this.props.onDeployClick }
        >
            { this.props.instances.id }
        </Button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    instances: state.bluegreen.instances
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeployClick: () => {
      dispatch({
        type: eventTypes.BLUEGREEN_UPDATE_INSTANCES,
        values:  { id: "three" },
      });
    }
  }
}

const Instances = connect(mapStateToProps,mapDispatchToProps)(InstancesContainer);
export default Instances;