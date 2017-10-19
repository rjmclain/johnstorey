import { put } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import { invokeApig } from "../libs/awsLib";
import * as amiSelectActions from "../actions/amiSelectActions";

export function * amiSelectFetchAMIsSaga(action) {
  try {
      const amiResponse = yield invokeApig({
        path: "/fetch-amis",
        method: "POST",
        headers: {},
        queryParams: {},
        body: {
          region: action.values,
          filters: action.filters
        }
      });

      yield put(amiSelectActions.amisFetched(amiResponse.Images,
        action.uniqueId));
  } catch (e) {
    yield put({type: eventTypes.AMISELECT_EC2_CALL_FAILED, error: e});
  }
}