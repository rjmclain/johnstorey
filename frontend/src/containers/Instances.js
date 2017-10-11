import React, { Component } from "react";
import "./Instances.css";
import config from "../config";
import { Button } from "react-bootstrap";
import { invokeApig } from "../libs/awsLib";

export default class Instances extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instances: [],
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
    const instance_list = await invokeApig({
      path: "/list",
      method: "GET"
    });

    this.setState({"instances": instance_list});
  }

  async onInstanceSelected(instanceId) {
    // Deregister old target.
    console.log("Instances props deployed for deregistration", this.props)
    this.props.deployed.map( (instance) => 
      this.props.deregister(instance.instanceId));
    this.props.setDeployed([]);

    // Register new target.
    await invokeApig({
      path: "/register",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {id: instanceId, group: config.ec2.TARGET_GROUP }
    })
    this.props.setDeployed([{ instanceId: instanceId }]);

  }

  render() {
    return (
      <div>
      { this.state.instances.map( instance => (
        <div>
        <Button className="instance" 
         onClick={(e) => this.onInstanceSelected(instance.Instances[0].InstanceId) }
         key={instance.Instances[0].InstanceId}>{instance.Instances[0].InstanceId}</Button>
         <br />
         </div>
      ))}
      </div>

    );
  }
}