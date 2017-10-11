import initialState from "./initialState";
import types from "../eventTypes";

// Actions (what we think of as events) are sent to every reducer.
// Handle the ones you want to.
export default function(state = initialState.param2, // Relevant section of redux state
  action) {
    switch (action.type) {
      case eventTypes.EXAMPLE_ACTION:
        return [...state, action.data];

      default:
        return state;
    }
}