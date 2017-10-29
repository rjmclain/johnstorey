// @flow
import * as types from "../constants/eventTypes";

// Add a message.
export function message(message: string, uniqueId: string) {
  return {
    type: types.MESSAGE_SET,
    values: message,
    uniqueId: uniqueId
  };
}

// Clear all messages.
export function clear(uniqueId: string) {
  return {
    type: types.MESSAGE_CLEAR,
    uniqueId: uniqueId
  };
}
