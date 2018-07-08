import { ActionsTypes } from "/config/settings";

export function setRoutines(routines) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_ROUTINES, routines });
	};
}

export function setCurrentRoutine(routine) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_CURRENT_ROUTINE, routine });
	};
}
