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
    let instanceList = await invokeApig({
      path: "/list",
      method: "GET"
    });

    console.log("instance list", instanceList);

    instanceList = instanceList.map( (instance) => {
      return {
        key: instance.Instances[0].InstanceId,
        instanceId: instance.Instances[0].InstanceId,
        name: instance.Instances[0].Tags[1].Name
    }});


    this.setState({"instances": instanceList});
  }

  async onInstanceSelected(instanceId) {
    // Deregister old target.
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
         onClick={(e) => this.onInstanceSelected(instance.instanceId) }
         key={ instance.key }>{ instance.instanceId }</Button>
         <span key={ instance.id }>{ instance.name }</span>
         <br />
         </div>
      ))}
      </div>

    );
  }
}