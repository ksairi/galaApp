import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const loginImage = createReducer(null, {
	[ActionsTypes.SET_LOGIN_IMAGE](state, action) {
		return action.loginImage;
	}
});
export const mainMenuSliderImages = createReducer([], {
	[ActionsTypes.SET_MAIN_MENU_SLIDER_IMAGES](state, action) {
		return action.mainMenuSliderImages;
	}
});
