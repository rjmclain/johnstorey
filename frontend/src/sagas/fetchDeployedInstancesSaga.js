import { put } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import * as blueGreenActions from "../actions/blueGreenActions";
import { invokeApig } from "../libs/awsLib";

export function* fetchDeployedInstancesSaga(action) {
  try {
    const instances = yield invokeApig({
      path: "/target-health",
      method: "GET"
    });

    const instanceList = instances.TargetHealthDescriptions.map(instance => {
      return { instanceId: instance.Target.Id };
    });

    const recordEvent = instanceSelectActions.recordDeployedInstance(
      instanceList,
      action.region,
      action.namespace
    );
    yield put(recordEvent);
  } catch (e) {
    yield put({ type: eventTypes.BLUEGREEN_EC2_CALL_FAILED, error: e });
  }
}
