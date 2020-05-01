import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export default createReducer([], {
  [ActionsTypes.SET_TIMETABLE](state, action) {
    if (action.timetable == null) {
      return [];
    }
    return action.timetable;
  },
});
