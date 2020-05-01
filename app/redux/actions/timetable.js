import {ActionsTypes} from "config/settings";

export default function setTimetable(timetable) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_TIMETABLE, timetable});
  };
}
