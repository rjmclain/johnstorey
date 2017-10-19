import React, { Component } from "react";
import { connect } from "react-redux";
import * as instanceSelectActions from "../actions/instanceSelectActions";

class InstanceSelectPresentation extends Component {
  constructor(props) {
    super(props);

    let initialValues = {};
    initialValues[props.uniqueId] = {
      instances: [],
      filters: [],
    };
    this.state = initialValues;
  }

  componentDidMount() {
    const filters = this.props.filters;
    this.props.dispatch(
      instanceSelectActions.fetchInstances(
        "us-east-1",
        this.props.uniqueId,
        filters));
  }

  componentDidUpdate() {
    // Handle redux state changes needing propagation upstream.
    let newValue = "";
    if (this.props[this.props.uniqueId].instances.length !== 0) {
      newValue = this.props[this.props.uniqueId].instances[0].Instances[0].InstanceId;
    this.props.updateParent(newValue);
    }
  }

  render() {
    return (
          <span>
          <select onChange={ this.props.onSelectHandler }>
            { 
              this.props[this.props.uniqueId].instances.map( (instance) => {
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
  let newProps = {} ;
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