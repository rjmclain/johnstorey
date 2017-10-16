import { put } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import * as blueGreenActions from "../actions/blueGreenActions";
import config from "../config";
import { invokeApig } from "../libs/awsLib";

export function * deployTargetSaga(action) {
  
  try {
    // Undeploy existing targets.
    for (let defunctInstance of action.remove) {

      yield invokeApig({
        path: "/deregister",
        method: "POST",
        headers: {},
        queryParams: {},
        body: {
          id: defunctInstance.instanceId,
          group: config.ec2.TARGET_GROUP
        }
      });
    }

    // Deploy new target.
    yield invokeApig({
      path: "/register",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {
        id: action.values,
        group: config.ec2.TARGET_GROUP
      }
    });

    yield put(blueGreenActions.instanceDeployed(
      [{ instanceId: action.values}] ));

  } catch (e) {
    yield put({type: eventTypes.BLUEGREEN_EC2_CALL_FAILED, error: e});
  }
}