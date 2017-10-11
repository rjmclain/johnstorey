import React, { Component } from "react";
import config from "../config";
import { invokeApig } from "../libs/awsLib";

export default class Deployed extends Component {
  constructor(props) {
    super(props);

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
    
    const instanceList = deployed_list.TargetHealthDescriptions.map( (instance) => {
      return { instanceId: instance.Target.Id };
    });

    this.props.setDeployed(instanceList);
  }

  render() {
    return (
      <div>
      { this.props.deployed.map( instance => (
        <div>
        <span className="deployed" 
         key={instance.instanceId}>
          {instance.instanceId}
        </span><br />
         </div>
      ))}
      </div>

    );
  }
}