import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function (state = initialState.messages, action) {
  switch (action.type) {
    case types.MESSAGE_SET:
      return Object.assign({}, state, { text: [ action.values ] }); 

    case types.MESSAGE_CLEAR:
      return Object.assign({}, state, []);

    default:
      return state;
  }
}