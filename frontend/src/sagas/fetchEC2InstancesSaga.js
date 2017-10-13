import { put, call } from "redux-saga/effects";
import * as eventTypes from "../constants/eventTypes";
import config from "../config";
import { invokeApig } from "../libs/awsLib";

export function* fetchEC2InstancesSaga(action) {
  try {
    const instances = yield invokeApig({
      path: "/list",
      method: "GET"
    });

    const instanceList = instances.map( (instance) => {
      return {
        key: instance.Instances[0].InstanceId,
        instanceId: instance.Instances[0].InstanceId
      }
    });

    yield put({ 
      type: eventTypes.BLUEGREEN_UPDATE_INSTANCES,
      values: instanceList
    });

  } catch (e) {
    yield put ({type: eventTypes.BLUEGREEN_EC2_CALL_FAILED, error: e});
  }
}