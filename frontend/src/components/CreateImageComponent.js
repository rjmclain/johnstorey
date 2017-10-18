import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { invokeApig } from "../libs/awsLib";
import RegionsSelect from "./RegionsSelect";
import InstanceSelect from "./InstanceSelect";
import * as instanceSelectActions from "../actions/instanceSelectActions";

class CreateImageComponentPresentation extends Component {

  constructor(props) {
    super(props);

    this.handleInstanceId = this.handleInstanceId.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInstanceId(event) {
    this.setState({ instanceid: event.target.value });
  }

  handleRegion(event) {
    this.props.dispatch(instanceSelectActions.fetchInstances(
      event.target.value,
      'createimage_instances'
    ))
    this.setState({ region: event.target.value });
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  async handleSubmit(event) {

    let stopResults = invokeApig({
      path: "/stop-instance",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {
        instanceId: this.state.instanceid,
    }});

stopResults.then((data) => {

  let createImage = invokeApig({
    path: "/create-image",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      instanceId: this.state.instanceid,
      amiName: this.state.name,
      amiDescription: this.state.description,
      region: this.state.region
    }
  });


  createImage.then((data) => {
  });

  createImage.catch( (err) => { console.log("createImage err", err); });
});

  stopResults.catch( (err) => { console.log("stopResults err", err); });

event.preventDefault();
}

  render() {
    return (
    <span>

        <form onSubmit={ this.handleSubmit }>

      <div className="row">
        <span align="center" className="col-lg-2">
          Region
        </span>
        <span align="center" className="col-lg-10">
          <RegionsSelect onSelectHandler={ this.handleRegion } />
        </span>
      </div>

      <div className="row">
        <span align="center" className="col-lg-2">
          Instance Id
        </span>
        <span align="center" className="col-lg-6">
          <InstanceSelect
            onSelectHandler={ this.handleInstanceId }
            uniqueId="createimage_instances"
          />
        </span>
        
        <span align="center" className="col-lg-2">
          <Button onClick={ this.handleSubmit }>Create</Button>
        </span>
      </div>

      <div className="row">
        <span align="center" className="col-lg-2">
          Name
        </span>
        <span align="center" className="col-lg-10">
          <input type="text"
            onChange={ this.handleName } />
        </span>
      </div>

      <div className="row">
        <span className="col-lg-2">
          Description
        </span>
        <span className="col-lg-10">
          <input type="text" 
            onChange={ this.handleDescription } />
        </span>

      </div>
        </form>
    </span>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const newProps = {};
  return newProps;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
}

const CreateImageComponent = connect(mapStateToProps,mapDispatchToProps)(CreateImageComponentPresentation);
export default CreateImageComponent;