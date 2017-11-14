import { put } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import * as blueGreenActions from "../actions/blueGreenActions";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import config from "../config";
import { invokeApig } from "../libs/awsLib";
import * as messageBoxActions from "../actions/messageBoxActions";

export function* deployTargetSaga(action) {
  console.log("deployTargetSaga action", action);

  try {
    // Undeploy existing targets.
    for (let defunctInstance of action.remove) {
      action.dispatch(
        messageBoxActions.message(
          "Undeploying instance" + defunctInstance.instanceId,
          "blueGreen"
        )
      );

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
    action.dispatch(
      messageBoxActions.message(
        "Deploying instance " + action.values,
        "blueGreen"
      )
    );

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

    yield put(
      instanceSelectActions.isDeployed(
        action.values,
        action.region,
        action.namespace
      )
    );
  } catch (e) {
    yield put({ type: eventTypes.BLUEGREEN_EC2_CALL_FAILED, error: e });
  }
}
