import {ActionsTypes} from "config/settings";

// eslint-disable-next-line import/prefer-default-export
export function setTimetable(timetable) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_TIMETABLE, timetable});
  };
}
