import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import InstanceSelect from "../../components/InstanceSelect";
import * as blueGreenActions from "../../actions/blueGreenActions";

class ViewPresentation extends Component {
  constructor() {
    super();
    this.handleDeploy = this.handleDeploy.bind(this);
  }

  handleDeploy(event) {
    // TODO: These need real values from mapStateToProps.
    this.props.dispatch(
      blueGreenActions.deployInstance(
        this.props.dispatch,
        this.props.idToDeploy,
        this.props.namespace,
        this.props.deployed
      )
    );
  }

  render() {
    return (
      <div>
        <Row className="instance">
          <Col xs={12} md={12}>
            <InstanceSelect
              onSelectHandler={this.props.handleInstanceId}
              updateParent={this.props.setInstanceId}
              namespace={this.props.namespace}
              filters={this.props.filters}
              region="us-east-1"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={9} />
          <Col xs={3} md={3}>
            <Button onClick={this.handleDeploy} className="deploy-button">
              Deploy Now
            </Button>
          </Col>
          <Col xs={2} md={2} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    idToDeploy: state.instanceSelect[ownProps.namespace].toDeploy,
    instancesToRemove:
      state.instanceSelect[ownProps.namespace].instancesToRemove
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const ViewContainer = connect(mapStateToProps, mapDispatchToProps)(
  ViewPresentation
);
export default ViewContainer;
