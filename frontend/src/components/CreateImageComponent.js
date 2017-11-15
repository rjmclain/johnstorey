import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import RegionsSelect from "./RegionsSelect";
import InstanceSelect from "./InstanceSelect";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import MessageBox from "../containers/MessageBox";
import * as messageBoxActions from "../actions/messageBoxActions";
import * as waitFor from "../containers/waitFor";
import * as awsHelpers from "../libs/awsHelpers";
import ErrorView from "../containers/common-views/error";
import LoadingView from "../containers/common-views/loading";
import InstancesGrid from "../containers/create-image-view/view";

const namespace = "createImage";

// Choose state to display.
const StateToDisplay = state => {
  console.log("CreateImageComponent StateToDisplay state", state);
  if (state.loading) {
    return <LoadingView />;
  } else if (state.instances) {
    const filters = [
      {
        Name: "instance-state-name",
        Values: ["running", "stopped"]
      }
    ];

    return <InstancesGrid {...state} filters={filters} />;
  } else {
    console.log("CreateImageComponent state", state);
    return <ErrorView {...state} />;
  }
};

class CreateImageComponentView extends Component {
  /*
  constructor(props) {
    super(props);
    this.handleInstanceId = this.handleInstanceId.bind(this);
    this.handleInstanceSelectChanged = this.handleInstanceSelectChanged.bind(
      this
    );
    this.handleName = this.handleName.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  */

  // shouldComponentUpdate(nextProps) {
  //   return false;
  // }

  componentDidMount() {
    this.props.dispatch(messageBoxActions.clear(namespace));
    this.props.dispatch(instanceSelectActions.fetchDeployed(namespace));
    this.props.dispatch(
      instanceSelectActions.fetchInstances(
        "us-east-1",
        namespace,
        this.instanceFilters()
      )
    );
  }

  // Filter the AMI instances we want.
  instanceFilters() {
    const filters = [
      {
        Name: "instance-state-name",
        Values: ["running", "stopped"]
      }
    ];
    return filters;
  }

  render() {
    return <StateToDisplay {...this.props} />;
  }
}

const mapStateToProps = (state, props) => {
  const mappedState = {
    loading: state.instanceSelect[namespace].loading,
    instances: state.instanceSelect[namespace].instances,
    error: state.instanceSelect[namespace].error,
    isDeployed: state.instanceSelect[namespace].isDeployed,
    instanceToDeploy: state.instanceSelect[namespace].toDeploy,
    namespace: namespace
  };
  return mappedState;
};

const mapDispatchToProps = dispatch => {
  return { dispatch: dispatch };
};

const CreateImageComponentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateImageComponentView);
export default CreateImageComponentContainer;
