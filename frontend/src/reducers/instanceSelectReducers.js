import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function(state = initialState.instanceSelect, action) {
  let newValues = {};
  const namespace = action.namespace;
  let newState = {};

  switch (action.type) {
    case types.INSTANCESELECT_INSTANCES_FETCHED:
      newValues[namespace] = state[namespace];
      newValues[namespace].instances = action.values;
      newValues[namespace].loading = false;
      newState = Object.assign({}, state, newValues);
      return newState;

    case types.INSTANCESELECT_SELECTED:
      newValues[namespace] = state[namespace];
      newValues[namespace].toDeploy = action.instanceId;
      newState = Object.assign({}, state, newValues);
      return newState;

    case types.INSTANCESELECT_RECORDDEPLOYED:
      newValues[namespace] = state[namespace];
      newValues[namespace].isDeployed = action.instances[0].instanceId;
      newState = Object.assign({}, state, newValues);
      return state;

    case types.INSTANCESELECT_ISDEPLOYED:
      newValues[namespace] = state[namespace];
      newValues[namespace].isDeployed = action.instanceId;
      newState = Object.assign({}, state, newValues);
      return newState;

    default:
      return state;
  }
}
