import React, { Component } from "react";
import "./Home.css";
import Instances from "./Instances";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
      <div className="lander">
      <h1>DNN Deployment</h1>
      <p>A big red button app</p>
      <Instances />
      </div>
      </div>
    );
  }
}