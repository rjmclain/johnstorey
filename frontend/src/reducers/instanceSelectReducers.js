import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function(state = initialState.instanceSelect, action) {
  let newValues = {};
  const key = action.uniqueId;
  let newState = {};

  switch (action.type) {
    case types.INSTANCESELECT_INSTANCES_FETCHED:
      newValues[action.uniqueId] = {};
      newValues[action.uniqueId].instances = action.values;
      return Object.assign({}, state, newValues);

    case types.INSTANCESELECT_SELECTED:
      newValues[key] = state[key];
      newValues[key].toDeploy = action.values;
      newState = Object.assign({}, state, newValues);
      return newState;

    case types.INSTANCESELECT_ISDEPLOYED:
      newValues[key] = state[key];
      newValues[key].isDeployed = action.values;
      newState = Object.assign({}, state, newValues);
      return newState;

    default:
      return state;
  }
}
