import { ActionsTypes } from '/config/settings'

export function setRoutines(routines){
	return (dispatch, getState) => {
		dispatch({type: ActionsTypes.SET_ROUTINES, routines})
	}
 }