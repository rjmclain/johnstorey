import { combineReducers } from "redux";
import blueGreenInstancesReducer from "./blueGreenInstancesReducer";
import amiSelectReducers from "./amiSelectReducers";
import instanceSelectReducers from "./instanceSelectReducers";
import messageBoxReducers from "./messageBoxReducers";

// Combine all reducers into a single reducer function.
const rootReducer = combineReducers({
  bluegreen: blueGreenInstancesReducer,
  amiSelect: amiSelectReducers,
  instanceSelect: instanceSelectReducers,
  message: messageBoxReducers,
});

export default rootReducer;