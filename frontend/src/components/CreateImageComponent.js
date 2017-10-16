import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import eventTypes from "../constants/eventTypes";

class CreateImageComponentPresentation extends Component {
  render() {
    return (
    <span>
      <div className="row">
        <span align="center" className="col-lg-2">
          Instance Id
        </span>
        <span align="center" className="col-lg-6">
          <input type="text" value="{this.state.value}" onChange={this.handleChange} />
        </span>
        <span align="center" className="col-lg-2">
          <Button>Create</Button>
        </span>
      </div>

      <div className="row">
        <span align="center" className="col-lg-2">
          Region
        </span>
        <span align="center" className="col-lg-10">
          <input type="text" value="{this.state.value}" onChange={this.handleChange} />
        </span>
      </div>

      <div className="row">
        <span align="center" className="col-lg-2">
          Name
        </span>
        <span align="center" className="col-lg-10">
          <input type="text" value="{this.state.value}" onChange={this.handleChange} />
        </span>
      </div>

      <div className="row">
        <span className="col-lg-2">
          Description
        </span>
        <span className="col-lg-10">
          <input type="text" value="{this.state.value}" onChange={this.handleChange} />
        </span>

      </div>
    </span>
    )
  }
}


const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    onDeployClick: (instanceId, deployed) => {
//      dispatch(blueGreenActions.deployInstance(instanceId, deployed));
    }
  }
}

const CreateImageComponent = connect
  (mapStateToProps,mapDispatchToProps)(CreateImageComponentPresentation);
export default CreateImageComponent;
