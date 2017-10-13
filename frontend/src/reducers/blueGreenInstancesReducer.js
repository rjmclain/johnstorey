import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BLUEGREEN_UPDATE_INSTANCES:
      return Object.assign({}, state, {
          instances: action.values
        });

    case types.BLUEGREEN_INSTANCE_DEPLOYED:
      return Object.assign({}, state,
        { deployed: action.values}) ;

    default:
      return state;
  }
}