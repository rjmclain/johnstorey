import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "./BlueGreenComponent.css";
import Instances from "./Instances";
import MessageBox from "../containers/MessageBox";
import * as messageBoxActions from "../actions/messageBoxActions";
import * as blueGreenActions from "../actions/blueGreenActions";

const instancesNamespace = "deployCandidates";

class BlueGreenPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deregister: this.deregister,
      deployed: []
    };
  }

  componentDidMount() {
    this.props.dispatch(messageBoxActions.clear("blueGreen"));
    this.props.dispatch(blueGreenActions.fetchDeployed());
  }

  setDeployed(deployedList) {
    this.setState({ deployed: deployedList });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <h2>Deploy Candidates</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Instances
              deployed={this.state.deployed}
              setDeployed={this.setDeployed.bind(this)}
              namespace={instancesNamespace}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <MessageBox uniqueId="blueGreen" />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    instanceToDeploy: state.bluegreen.instanceToDeploy
  };
};

const BlueGreenContainer = connect(mapStateToProps)(BlueGreenPresentation);
export default BlueGreenContainer;
