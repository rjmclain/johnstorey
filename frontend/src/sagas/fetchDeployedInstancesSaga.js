import { put } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import * as blueGreenActions from "../actions/blueGreenActions";
import { invokeApig } from "../libs/awsLib";

export function* fetchDeployedInstancesSaga(action) {
  try {
    const instances = yield invokeApig({
      path: "/target-health",
      method: "GET"
    });

    const instanceList = instances.TargetHealthDescriptions.map( (instance) => {
      return { instanceId: instance.Target.Id };
    });

    yield put(blueGreenActions.instanceDeployed(instanceList));

  } catch (e) {
    yield put ({type: eventTypes.BLUEGREEN_EC2_CALL_FAILED, error: e});
  }
}