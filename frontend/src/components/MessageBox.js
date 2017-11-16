import React, { Component } from "react";
import { connect } from "react-redux";

class MessageBoxContainer extends Component {
  render() {
    let displayMessages = [];
    const stateMessages = this.props.messages;

    if (stateMessages) {
      displayMessages = stateMessages.map(message => {
        return (
          <p value={message} key={message}>
            {message}
          </p>
        );
      });
    }

    return (
      <span>
        <h2>Messages</h2>
        {displayMessages}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.message[ownProps.uniqueId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const MessageBox = connect(mapStateToProps, mapDispatchToProps)(
  MessageBoxContainer
);
export default MessageBox;
