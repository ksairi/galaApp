import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export const routines = createReducer([], {
  [ActionsTypes.SET_ROUTINES](prevRoutines, action) {
    if (action.routines == null) {
      return [];
    }
    return action.routines;
  },
});

export const currentRoutine = createReducer(null, {
  [ActionsTypes.SET_CURRENT_ROUTINE](prevState, action) {
    if (action.routine) {
      return action.routine;
    }
    return prevState;
  },
});
