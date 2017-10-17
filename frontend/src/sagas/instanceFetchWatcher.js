import { takeLatest } from "redux-saga/effects";
import { instanceFetchSaga } from "./instanceFetchSaga";
import * as eventTypes from "../constants/eventTypes";

export default function* instanceFetchWatcher() {
  yield takeLatest(eventTypes.INSTANCESELECT_FETCH_INSTANCES,
    instanceFetchSaga);
}