import * as types from "../constants/eventTypes";
import initialState from "./initialState";

export default function (state = initialState.amiSelect, action) {
  switch (action.type) {
    case types.AMISELECT_AMIS_FETCHED:
      let newValues = {};
      newValues[action.uniqueId] = action.values;

      console.log('amiSelectReducers action', action);

      if (action.values.length > 0) {
        newValues[action.uniqueId + '_currentAMI'] = action.values[0].ImageId;
      } else {
        newValues[action.uniqueId + '_currentAMI'] = '';
      }

      return Object.assign({}, state, newValues);

    default:
      return state;
  }
}