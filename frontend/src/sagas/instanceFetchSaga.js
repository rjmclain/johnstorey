import { put } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import { invokeApig } from "../libs/awsLib";
import * as instanceSelectActions from "../actions/instanceSelectActions";

export function* instanceFetchSaga(action) {
  console.log("instanceFetchSaga action", action);
  try {
    const response = yield invokeApig({
      path: "/describe-instance",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {
        region: action.values,
        filters: action.filters
      }
    });

    const newAction = instanceSelectActions.instancesFetched(
      response.Reservations,
      action.namespace
    );

    yield put(newAction);
  } catch (e) {
    yield put({ type: eventTypes.AMISELECT_EC2_CALL_FAILED, error: e });
  }
}
