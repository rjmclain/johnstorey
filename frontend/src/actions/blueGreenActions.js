import * as types from "../constants/eventTypes";

// Update the available instances list.
export function blueGreenUpdateInstances(values) {
  return {
    type: types.BLUEGREEN_UPDATE_INSTANCES,
    values    
  }
}