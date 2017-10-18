import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import Instances from "./Instances";
import Deployed from "./Deployed";
import MessageBox from "../containers/MessageBox";
import * as messageBoxActions from "../actions/messageBoxActions";

class HomePresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deregister: this.deregister,
      deployed: []
    }
  }

  componentDidMount() {
    this.props.dispatch(
      messageBoxActions.clear()
    );
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
        />
      <h3>Status Messages</h3>
      <MessageBox />
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
}
const HomeContainer = connect(mapStateToProps)(HomePresentation);
export default HomeContainer;