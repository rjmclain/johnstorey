import { takeLatest } from "redux-saga/effects";
import { deployTargetSaga } from "./deployTargetSaga";
import * as eventTypes from "../constants/eventTypes";

export default function* fetchDeployedInstancesWatcher() {
  yield takeLatest(eventTypes.BLUEGREEN_DEPLOY_INSTANCE, deployTargetSaga);
}