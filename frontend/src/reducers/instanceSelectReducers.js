import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function (state = initialState.instanceSelect, action) {
  switch (action.type) {
    case types.INSTANCESELECT_INSTANCES_FETCHED:
      let newValues = {};
      newValues[action.uniqueId] = action.values;
      return Object.assign({}, state, newValues);

    default:
      return state;
  }
}