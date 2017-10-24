import React, { Component } from "react";

import Select from 'react-select';
import { connect } from "react-redux";
import * as amiSelectActions from "../actions/amiSelectActions";

class AMISelectPresentation extends Component {
  constructor(props) {
    super(props);


    let initialValues = {};
    initialValues[props.uniqueId] = [];

    const propsAMIKey = props.uniqueId + '_currentAMI';
    initialValues[propsAMIKey] = '';

    this.state = initialValues;

    this.handleOnChange = this.handleOnChange.bind(this);
    this.onAMISelect = this.onAMISelect.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(amiSelectActions.fetchAMIs("us-east-1",
      this.props.uniqueId,
      this.props.filters));
  }

  componentDidUpdate() {
    // Handle redux state changes needing propagation upstream.
    let newValue = "";
    if (this.props[this.props.uniqueId].length !== 0) {
      newValue = this.props[this.props.uniqueId][0].ImageId;
    }
  }

  handleOnChange (event) {
    this.props.dispatch(amiSelectActions.fetchAMIs(event.target.value,
      this.props.uniqueId,
      this.filters));
  }

  onAMISelect(event) {
    this.props.dispatch(amiSelectActions.setAMI(
      event.target.value,
      this.props.uniqueId
    ));
  }

  render() {
    return (
          <span>
          <select onChange={ this.onAMISelect }>
            { 
              this.props[this.props.uniqueId].map( (AMI) => {
                return (
                  <option key={ AMI.ImageId } value={ AMI.ImageId }>
                    { AMI.ImageId }
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
  newProps[ownProps.uniqueId] = state.amiSelect[ownProps.uniqueId];
  newProps[ownProps.uniqueId + '_currentAMI'] = '';
  return newProps;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
}

const AMISelect = connect(mapStateToProps,mapDispatchToProps)(AMISelectPresentation);
export default AMISelect;