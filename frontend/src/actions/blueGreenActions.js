import * as types from "../constants/eventTypes";

// Fetch the instance list.
export function fetchInstances() {
  return {
    type: types.BLUEGREEN_FETCH_INSTANCES
  };
}

// Update the available instances list.
export function updateInstances(values) {
  return {
    type: types.BLUEGREEN_UPDATE_INSTANCES,
    values
  };
}

// Deploy a new DNN.
export function deployInstance(
  dispatch,
  idToDeploy,
  namespace,
  instancesToRemove = []
) {
  return {
    type: types.BLUEGREEN_DEPLOY_INSTANCE,
    values: idToDeploy,
    remove: instancesToRemove,
    dispatch: dispatch,
    namespace: namespace
  };
}

// New DNN has been deployed.
export function instanceDeployed(instanceId) {
  return {
    type: types.BLUEGREEN_INSTANCE_DEPLOYED,
    values: instanceId
  };
}
