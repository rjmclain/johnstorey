import React, { Component } from "react";
import config from "../config";
import { invokeApig } from "../libs/awsLib";

export default class Deployed extends Component {
  constructor(props) {
    super(props);

    console.log("Deployed props in ctor", props);
    this.state = {
      region: config.ec2.region
    };
  }

  async componentDidMount() {
    try {
      await this.refreshInstanceList();
    } catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  async refreshInstanceList() {
    const deployed_list = await invokeApig({
      path: "/target-health",
      method: "GET"
    });
    
    console.log("deployed_list", deployed_list);

    const instanceList = deployed_list.TargetHealthDescriptions.map( (instance) => {
      console.log("instance in map", instance);
      return { instanceId: instance.Target.Id };
    });

    this.props.setDeployed(instanceList);
  }

  render() {
    return (
      <div>
      { this.props.deployed.map( instance => (
        <div>
        <span className="instance" 
         key={instance.instanceId}>
          {instance.instanceId}
        </span><br />
         </div>
      ))}
      </div>

    );
  }
}