import { put } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import * as instanceSelectActions from "../actions/instanceSelectActions";
import config from "../config";
import { invokeApig } from "../libs/awsLib";
import * as messageBoxActions from "../actions/messageBoxActions";

export function* deployTargetSaga(action) {
  if (action.remove === action.values) {
    action.dispatch(
      messageBoxActions.message(
        "Instance " + action.values + " already deployed.",
        "blueGreen"
      )
    );
    return;
  }

  if (action.values === "") {
    action.dispatch(
      messageBoxActions.message(
        "You must choose an instance to deploy.",
        "blueGreen"
      )
    );
    return;
  }
  try {
    // Undeploy existing target.
    action.dispatch(
      messageBoxActions.message(
        "Undeploying instance" + action.remove,
        "blueGreen"
      )
    );

    yield invokeApig({
      path: "/deregister",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {
        id: action.remove,
        group: config.ec2.TARGET_GROUP
      }
    });

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
    yield put({ type: eventTypes.INSTANCESELECT_EC2_CALL_FAILED, error: e });
  }
}
