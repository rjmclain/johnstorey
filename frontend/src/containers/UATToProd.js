import React, { Component } from "react";
import { invokeApig, authUser, signOutUser } from "../libs/awsLib";
import config from "../config";
import "./Home.css";
import Instances from "./Instances";
import Deployed from "./Deployed";
import CreateImageComponent from "../components/CreateImageComponent";

export default class UATToProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deregister: this.deregister,
      deployed: []
    }
  }

  async deregister(instanceId) {
    await invokeApig({
      path: "/deregister",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {id: instanceId, group: config.ec2.TARGET_GROUP }
    })
  }

  setDeployed(deployedList) {
    this.setState({ deployed: deployedList});
  }

  render() {
    return (
      <div className="container">
        <h2>Create Image from Instance</h2>
          <CreateImageComponent />

        <div className="row">
          <h2>Copy Image to Region</h2>
        </div>

      </div>
    );
  }
}