import { combineReducers } from "redux";
import exampleReducer from "exampleReducer";

// Combine all reducers into a single reducer function.
const rootReducer = combineReducers({
  exampleReducer,
});

export default rootReducer;