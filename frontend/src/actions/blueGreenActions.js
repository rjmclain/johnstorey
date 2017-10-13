import * as types from "../constants/eventTypes";

// Fetch the instance list.
export function blueGreenFetchInstances(values) {
  return {
    type: types.BLUEGREEN_FETCH_INSTANCES,
  }
}

// Update the available instances list.
export function blueGreenUpdateInstances(values) {
  return {
    type: types.BLUEGREEN_UPDATE_INSTANCES,
    values    
  }
}