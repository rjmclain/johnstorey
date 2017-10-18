import React, { Component } from "react";
import { connect } from "react-redux";
import * as amiSelectActions from "../actions/amiSelectActions";

class AMISelectPresentation extends Component {
  constructor(props) {
    super(props);

    let initialValues = {};
    initialValues[props.uniqueId] = [];
    this.state = initialValues;

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(amiSelectActions.fetchAMIs("us-east-1",
      this.props.uniqueId));
  }

  componentDidUpdate() {
    // Handle redux state changes needing propagation upstream.
    let newValue = "";
    if (this.props[this.props.uniqueId].length != 0) {
      newValue = this.props[this.props.uniqueId][0].ImageId;
      this.props.updateParent(newValue);
    }
  }


  handleOnChange (event) {
    this.props.onSelectHandler(event);
    this.props.dispatch(amiSelectActions.fetchAMIs(event.target.value,
      this.props.uniqueId));
  }

  render() {
    return (
          <span>
          <select onChange={ this.props.onSelectHandler }>
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

  return newProps;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
}

const AMISelect = connect(mapStateToProps,mapDispatchToProps)(AMISelectPresentation);
export default AMISelect;