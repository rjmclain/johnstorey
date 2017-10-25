import React, { Component } from "react";
import { connect } from "react-redux";
//import * as messageBoxActions from "../actions/messageBoxActions";

class MessageBoxContainer extends Component {

  render() {
    return (
      this.props.messages.text.map( (message) => {
        return <p key={ message.text }>{ message }</p>;
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