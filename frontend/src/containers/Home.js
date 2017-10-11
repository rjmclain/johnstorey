import React, { Component } from "react";
import "./Home.css";
import Instances from "./Instances";
import Deployed from "./Deployed";

export default class Home extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   deregister: deregister,
    //   deployed: []
    // }
  }

  async deregister(instanceId) {
    // await invokeApig({
    //   path: "/deregister",
    //   method: "POST",
    //   headers: {},
    //   queryParams: {},
    //   body: {id: instanceId, group: config.ec2.TARGET_GROUP }
    // })
  }

  render() {
    return (
      <div className="Home">
      <div className="lander">
      <h1>DNN Deployment</h1>
      <br />
      <p>Deployed</p>
      <Deployed parentProps={this.state} />
      <br />
      <p>Deployment Candidates</p>
      <Instances parentProps={this.state}/>
      </div>
      </div>
    );
  }
}