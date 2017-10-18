import { put } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import * as blueGreenActions from "../actions/blueGreenActions";
import config from "../config";
import { invokeApig } from "../libs/awsLib";
import * as messageBoxActions from "../actions/messageBoxActions";

export function * deployTargetSaga(action) {
 console.log("deployTargetSaga action", action);

  try {
    // Undeploy existing targets.
    for (let defunctInstance of action.remove) {

      action.dispatch(messageBoxActions.message(
        "Undeploying instance" + defunctInstance.instanceId));

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

    action.dispatch(messageBoxActions.message(
      "Deploying instance " + action.values));

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