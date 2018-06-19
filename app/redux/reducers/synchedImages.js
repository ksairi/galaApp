import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const loginImage = createReducer(null, {
	[ActionsTypes.SET_LOGIN_IMAGE](state, action) {
		return action.loginImage;
	}
});
export const mainMenuImages = createReducer([], {
	[ActionsTypes.SET_MAIN_MENU_IMAGES](state, action) {
		return action.mainMenuImages;
	}
});

export const synchedImagesParameters = createReducer(
	{ loginImages: { imageIndex: 0 } },
	{
		[ActionsTypes.SET_SYNCHED_IMAGES_PARAMETERS](state, action) {
			return action.synchedImagesParameters;
		}
	}
);
