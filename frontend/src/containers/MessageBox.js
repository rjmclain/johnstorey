import React, { Component } from "react";
import { connect } from "react-redux";
//import * as messageBoxActions from "../actions/messageBoxActions";

class MessageBoxContainer extends Component {
  componentDidMount() {
  //  this.props.dispatch(messageBoxActions.clearMessages());
  }

  render() {
    return (
      this.props.messages.map( (message) => {
        return <p>{ message }</p>;
      })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.message,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
}

const MessageBox = connect(mapStateToProps,mapDispatchToProps)(MessageBoxContainer);
export default MessageBox;