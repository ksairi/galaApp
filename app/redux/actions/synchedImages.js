import { ActionsTypes } from "/config/settings";

export function setLoginImage(loginImage) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_LOGIN_IMAGE, loginImage });
	};
}

export function setMainMenuImages(mainMenuImages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_MAIN_MENU_SLIDER_IMAGES,
			mainMenuImages
		});
	};
}
