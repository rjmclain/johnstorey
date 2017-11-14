import { takeLatest } from "redux-saga/effects";
import { fetchDeployedInstancesSaga } from "./fetchDeployedInstancesSaga";
import * as eventTypes from "../constants/eventTypes";

export default function* fetchDeployedInstancesWatcher() {
  yield takeLatest(
    eventTypes.INSTANCESELECT_FETCH_DEPLOYED,
    fetchDeployedInstancesSaga
  );
}
