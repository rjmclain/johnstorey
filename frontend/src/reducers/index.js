import { combineReducers } from "redux";
import blueGreenInstancesReducer from "./blueGreenInstancesReducer";
import amiSelectReducers from "./amiSelectReducers";
import instanceSelectReducers from "./instanceSelectReducers";

// Combine all reducers into a single reducer function.
const rootReducer = combineReducers({
  bluegreen: blueGreenInstancesReducer,
  amiSelect: amiSelectReducers,
  instanceSelect: instanceSelectReducers,
});

export default rootReducer;