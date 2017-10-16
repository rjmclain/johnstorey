import React, { Component } from "react";
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

  render() {
    return (
      <div>
        {
        this.props.deployed.map( (instance) => {
        return(
        <span className="deployed" 
         key={ instance.instanceId }>
          { instance.instanceId }
        </span>
        );
      })}
      </div>
    );
  }
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