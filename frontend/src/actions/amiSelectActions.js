import * as types from "../constants/eventTypes";

// Fetch the AMI list.
export function fetchAMIs(region, uniqueId, filters) {
  return {
    type: types.AMISELECT_FETCH_AMIS,
    values: region,
    uniqueId: uniqueId,
    filters: filters
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

// Set current AMI.
export function setAMI(amiId, uniqueId) {
  return {
    type: types.AMISELECT_SET_AMI,
    values: amiId,
    uniqueId: uniqueId
  };
}