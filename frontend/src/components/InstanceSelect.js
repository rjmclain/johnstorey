import React, { Component } from "react";
import { connect } from "react-redux";
import * as instanceSelectActions from "../actions/instanceSelectActions";

class InstanceSelectPresentation extends Component {
  constructor(props) {
    super(props);

    let initialValues = {};
    initialValues[props.uniqueId] = [];
    this.state = initialValues;
  }

  componentDidMount() {
    // TODO Dispatch correct action.
    this.props.dispatch(
      instanceSelectActions.fetchInstances(
        "us-east-1",
        this.props.uniqueId));
  }

  render() {
    return (
          <span>
          <select onChange={ this.props.onSelectHandler }>
            { 
              this.props[this.props.uniqueId].map( (instance) => {
                return (
                  <option key={ instance.Instances[0].InstanceId }
                    value={ instance.Instances[0].InstanceId }>
                    { instance.Instances[0].InstanceId }
                  </option>
                );
            })}
          </select>
          </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const newProps = {};
  newProps[ownProps.uniqueId] = state.instanceSelect[ownProps.uniqueId];
  return newProps;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
}

const InstanceSelect = connect(mapStateToProps,mapDispatchToProps)(InstanceSelectPresentation);
export default InstanceSelect;