import React, { Component } from "react";
import { connect } from "react-redux";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import * as messageBoxActions from "../actions/messageBoxActions";
import ErrorView from "../containers/common-views/error";
import LoadingView from "../containers/common-views/loading";
import InstancesGrid from "../containers/create-image-view/view";

const namespace = "createImage";

// Choose state to display.
const StateToDisplay = state => {
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
    return <ErrorView {...state} />;
  }
};

class CreateImageComponentView extends Component {
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
