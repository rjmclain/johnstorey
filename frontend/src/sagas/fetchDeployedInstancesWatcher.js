  import { takeLatest } from "redux-saga/effects";
  import { fetchDeployedInstancesSaga } from "./fetchDeployedInstancesSaga"
  import * as eventTypes from "../constants/eventTypes";

  export default function* fetchDeployedInstancesWatcher() {
    yield takeLatest(eventTypes.BLUEGREEN_FETCH_DEPLOYED,
      fetchDeployedInstancesSaga);
  }