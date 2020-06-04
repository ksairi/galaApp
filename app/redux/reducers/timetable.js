import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export const timetable = createReducer([], {
  [ActionsTypes.SET_TIMETABLE](_state, action) {
    if (action.timetable == null) {
      return [];
    }
    return action.timetable;
  },
});
