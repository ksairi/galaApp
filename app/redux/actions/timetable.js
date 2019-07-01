import { ActionsTypes } from '/config/settings'

export function setTimetable (timetable) {
  return (dispatch, getState) => {
    dispatch({type: ActionsTypes.SET_TIMETABLE, timetable})
  }
}
