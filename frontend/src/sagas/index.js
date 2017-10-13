// Combine all sagas to a single root saga.
import { call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import fetchEC2InstancesWatcher from "./fetchEC2InstancesWatcher";

// Register all with a single generator.
export default function* startForeman() {
  yield fork(fetchEC2InstancesWatcher);
}