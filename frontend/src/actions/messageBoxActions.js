import * as types from "../constants/eventTypes";

// Add a message.
export function message(message) {
  return {
    type: types.MESSAGE_SET,
    values: message,
  };
}

// Clear all messages.
export function clear() {
  return {
    type: types.MESSAGE_CLEAR,
  };
}