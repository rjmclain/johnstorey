import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import config from "../config";
import * as blueGreenActions from "../actions/blueGreenActions";

class DeployedPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: config.ec2.region
    };
  }

  componentDidMount(){
    this.props.dispatch(blueGreenActions.fetchDeployed());
  }

  render() { return ''; }
}

const mapStateToProps = (state) => {
  return {
    deployed: state.bluegreen.deployed
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
}

const Deployed = connect(mapStateToProps,mapDispatchToProps)(DeployedPresentation);
export default Deployed;