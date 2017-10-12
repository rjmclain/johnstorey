import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BLUEGREEN_UPDATE_INSTANCES:
      return Object.assign({}, state, {
        bluegreen: {
          instances: action.values,
          deployed: state.bluegreen.deployed
        }});

    case types.BLUEGREEN_DEREGISTER:
      return state;

    case types.BLUEGREEN_UPDATE_DEPLOYED:
      return state;

    default:
      return state;
  }
}