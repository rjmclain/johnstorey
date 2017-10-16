// Combine all sagas to a single root saga.
import { fork } from "redux-saga/effects";
import fetchEC2InstancesWatcher from "./fetchEC2InstancesWatcher";
import fetchDeployedInstancesWatcher from "./fetchDeployedInstancesWatcher";
import deployTargetWatcher from "./deployTargetWatcher";

// Register all with a single generator.
export default function* startForeman() {
  yield fork(fetchEC2InstancesWatcher);
  yield fork(fetchDeployedInstancesWatcher);
  yield fork(deployTargetWatcher);
}