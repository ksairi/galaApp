import { ActionsTypes } from '/config/settings'

export function setTimetable(timetable){
	return async (dispatch, getState) => {
    if(timetable == null){
      dispatch({type: ActionsTypes.SET_TIMETABLE, timetable:[]})
      return
    }
    dispatch({type: ActionsTypes.SET_TIMETABLE, timetable})
	}
}