import { ActionsTypes } from "/config/settings";

export function setLoginImages(loginImages) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_LOGIN_IMAGES, loginImages });
	};
}

export function setMainMenuImages(mainMenuImages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_MAIN_MENU_IMAGES,
			mainMenuImages
		});
	};
}

export function setPromotions(promotions) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_PROMOTIONS,
			promotions
		});
	};
}

export function setRoutinesImages(routinesImages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_ROUTINES_IMAGES,
			routinesImages
		});
	};
}

export function setClassesImages(classesImages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_CLASSES_IMAGES,
			classesImages
		});
	};
}

export function setTimetableImages(timetableImages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_TIMETABLE_IMAGES,
			timetableImages
		});
	};
}
export function setSynchedImagesParameters(synchedImagesParameters) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_SYNCHED_IMAGES_PARAMETERS,
			synchedImagesParameters
		});
	};
}

export function setLastSynchedTimestamp(lastSynchedTimestamp) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.LAST_SYNCHED_TIMESTAMP,
			lastSynchedTimestamp
		});
	};
}
