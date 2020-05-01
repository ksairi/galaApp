import {ActionsTypes} from "config/settings";

export function setRoutines(routines) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_ROUTINES, routines});
  };
}

export function setCurrentRoutine(routine) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_CURRENT_ROUTINE, routine});
  };
}
