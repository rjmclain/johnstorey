import * as types from "../constants/eventTypes";

// Fetch the instance list.
export function fetchInstances() {
  return {
    type: types.BLUEGREEN_FETCH_INSTANCES,
  }
}

// Update the available instances list.
export function updateInstances(values) {
  return {
    type: types.BLUEGREEN_UPDATE_INSTANCES,
    values    
  }
}

// Fetch the currently registered targets.
export function fetchDeployed() {
  return {
    type: types.BLUEGREEN_FETCH_DEPLOYED,
  }
}


// Deploy a new DNN.
export function deployInstance(idToDeploy, instancesToRemove = []) {
  return {
    type: types.BLUEGREEN_DEPLOY_INSTANCE,
    values: idToDeploy,
    remove: instancesToRemove
  };
}

// New DNN has been deployed.
export function instanceDeployed(instanceId) {
  return {
    type: types.BLUEGREEN_INSTANCE_DEPLOYED,
    values: instanceId
  };
}
