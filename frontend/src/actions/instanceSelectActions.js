import * as types from "../constants/eventTypes";

// Fetch the AMI list.
export function fetchInstances(region, uniqueId, filters) {
  return {
    type: types.INSTANCESELECT_FETCH_INSTANCES,
    values: region,
    uniqueId: uniqueId,
    filters: filters
  }
}

// AMIs fetched.
export function instancesFetched(instances, uniqueId) {
  return {
    type: types.INSTANCESELECT_INSTANCES_FETCHED,
    values: instances,
    uniqueId: uniqueId
  }
}