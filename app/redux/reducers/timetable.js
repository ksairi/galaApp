import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

// eslint-disable-next-line import/prefer-default-export
export const timetable = createReducer([], {
  [ActionsTypes.SET_TIMETABLE](_state, action) {
    if (action.timetable == null) {
      return [];
    }
    return action.timetable;
  },
});
