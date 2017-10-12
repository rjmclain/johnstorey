import { combineReducers } from "redux";
import blueGreenInstancesReducer from "./blueGreenInstancesReducer";

// Combine all reducers into a single reducer function.
const rootReducer = combineReducers({
  bluegreen: blueGreenInstancesReducer,
});

export default rootReducer;