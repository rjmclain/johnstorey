import * as types from "../constants/eventTypes";

// Fetch the AMI list.
export function fetchAMIs(region, uniqueId) {
  return {
    type: types.AMISELECT_FETCH_AMIS,
    values: region,
    uniqueId: uniqueId
  }
}

// AMIs fetched.
export function amisFetched(amis, uniqueId) {
  return {
    type: types.AMISELECT_AMIS_FETCHED,
    values: amis,
    uniqueId: uniqueId
  }
}