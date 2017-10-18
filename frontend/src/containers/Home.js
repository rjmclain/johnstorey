import React, { Component } from "react";
import { invokeApig } from "../libs/awsLib";
import config from "../config";
import "./Home.css";
import Instances from "./Instances";
import Deployed from "./Deployed";
import MessageBox from "../containers/MessageBox";

export default class Home extends Component {
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
      <div className="Home">
      <div className="lander">
      <h1>DNN Deployment</h1>
      <br />
      <p>Deployed</p>
      <Deployed deployed={this.state.deployed} setDeployed={this.setDeployed.bind(this) } />
      <br />
      <p>Deployment Candidates</p>
      <Instances deployed={this.state.deployed}
        setDeployed={this.setDeployed.bind(this)}
        deregister={this.deregister.bind(this)}
        />
      <h3>Status Messages</h3>
      <MessageBox />
      </div>
      </div>
    );
  }
}