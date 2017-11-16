import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "./BlueGreenComponent.css";
import Instances from "./Instances";
import MessageBox from "../components/MessageBox";
import * as messageBoxActions from "../actions/messageBoxActions";

const instancesNamespace = "deployCandidates";

class BlueGreenPresentation extends Component {
  componentDidMount() {
    this.props.dispatch(messageBoxActions.clear("blueGreen"));
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
            <Instances namespace={instancesNamespace} />
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
  return {};
};

const BlueGreenContainer = connect(mapStateToProps)(BlueGreenPresentation);
export default BlueGreenContainer;
