  import { takeLatest } from "redux-saga/effects";
  import { fetchEC2InstancesSaga } from "./fetchEC2InstancesSaga"
  import * as eventTypes from "../constants/eventTypes";

  export default function* fetchEC2InstancesWatcher() {
    yield takeLatest(eventTypes.BLUEGREEN_FETCH_INSTANCES, fetchEC2InstancesSaga);
  }