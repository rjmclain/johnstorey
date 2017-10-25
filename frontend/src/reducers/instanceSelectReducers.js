import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function (state = initialState.instanceSelect, action) {
  let newValues = {};

  switch (action.type) {
    case types.INSTANCESELECT_INSTANCES_FETCHED:
      newValues[action.uniqueId] = {};
      newValues[action.uniqueId].instances = action.values;
      return Object.assign({}, state, newValues);

    case types.INSTANCESELECT_SELECTED:
      console.log('INSTANCESELECT_SELECTED state', state);
      console.log('INSTANCESELECT_SELECTED action', action);
      const key = action.uniqueId;
      newValues[key] = state[key];
      console.log('INSTANCESELECT_SELECTED newValues1', newValues);
      newValues[key].toDeploy = action.values;
      const newState = Object.assign({}, state, newValues);
      return newState;

    default:
      return state;
  }
}