import { combineReducers } from "redux";
import blueGreenInstancesReducer from "./blueGreenInstancesReducer";
import amiSelectReducers from "./amiSelectReducers";

// Combine all reducers into a single reducer function.
const rootReducer = combineReducers({
  bluegreen: blueGreenInstancesReducer,
  amiSelect: amiSelectReducers,
});

export default rootReducer;