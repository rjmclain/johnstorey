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

// Deploy a new target for DNN.
export function deployInstance(
  dispatch,
  idToDeploy,
  namespace,
  instanceToRemove
) {
  const action = {
    type: types.INSTANCESELECT_DEPLOY_INSTANCE,
    values: idToDeploy,
    remove: instanceToRemove,
    dispatch: dispatch,
    namespace: namespace
  };
  return action;
}

// Currently deployed.
export function isDeployed(
  instanceId: string,
  region: string,
  namespace: string
) {
  return {
    type: types.INSTANCESELECT_ISDEPLOYED,
    instanceId: instanceId,
    region: region,
    namespace: namespace
  };
}

// Get the currently deployed target.
export function recordDeployedInstance(instances, region, namespace) {
  return {
    type: types.INSTANCESELECT_RECORDDEPLOYED,
    instances: instances,
    region: region,
    namespace: namespace
  };
}

// Fetch the currently registered targets.
export function fetchDeployed(namespace) {
  return {
    type: types.INSTANCESELECT_FETCH_DEPLOYED,
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
