import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
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
    };
  }

  componentDidMount() {
    this.props.dispatch(messageBoxActions.clear());
  }

  setDeployed(deployedList) {
    this.setState({ deployed: deployedList });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Deployed
              deployed={this.state.deployed}
              setDeployed={this.setDeployed.bind(this)}
            />
          </Col>
        </Row>

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
              uniqueId="deployCandidates"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <MessageBox />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const HomeContainer = connect(mapStateToProps)(HomePresentation);
export default HomeContainer;
