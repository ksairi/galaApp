import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export const bookedClasses = createReducer([], {
  [ActionsTypes.SET_BOOKED_CLASSES](_state, action) {
    if (Array.isArray(action.bookedClasses)) {
      return action.bookedClasses;
    }
    return [..._state, action.bookedClasses];
  },

  [ActionsTypes.REMOVE_BOOKED_CLASS](_state, action) {
    return _state.filter((booking) => booking.id !== action.id);
  },
});
