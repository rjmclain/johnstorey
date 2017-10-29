import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function(state = initialState.messages, action) {
  let newValues = {};
  switch (action.type) {
    case types.MESSAGE_SET:
      newValues[action.uniqueId] = [action.values];
      return Object.assign({}, state, newValues);

    default:
      return state;
  }
}
