import { ActionsTypes } from "/config/settings";

export function setLoginImage(loginImage) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_LOGIN_IMAGE, loginImage });
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

export function setSynchedImagesParameters(synchedImagesParameters) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_SYNCHED_IMAGES_PARAMETERS,
			synchedImagesParameters
		});
	};
}
