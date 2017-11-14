import * as types from "../constants/eventTypes";

// Fetch the AMI list.
export function fetchInstances(region, namespace, filters) {
  return {
    type: types.INSTANCESELECT_FETCH_INSTANCES,
    values: region,
    namespace: namespace,
    filters: filters
  };
}

// AMIs fetched.
export function instancesFetched(instances, namespace) {
  return {
    type: types.INSTANCESELECT_INSTANCES_FETCHED,
    values: instances,
    namespace: namespace
  };
}

// Currently deployed.
export function currentlyDeployed(
  instanceId: string,
  region: string,
  namespace: string
) {
  return {
    type: types.INSTANCESELECT_ISDEPLOYED,
    values: {
      instanceId: instanceId,
      region: region
    },
    namespace: namespace
  };
}

// Instance selected.
export function selected(instanceId, namespace) {
  return {
    type: types.INSTANCESELECT_SELECTED,
    instanceId: instanceId,
    namespace: namespace
  };
}
