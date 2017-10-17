import { takeLatest } from "redux-saga/effects";
import { amiSelectFetchAMIsSaga } from "./amiSelectFetchAMIsSaga";
import * as eventTypes from "../constants/eventTypes";

export default function* fetchDeployedInstancesWatcher() {
  yield takeLatest(eventTypes.AMISELECT_FETCH_AMIS,
    amiSelectFetchAMIsSaga);
}