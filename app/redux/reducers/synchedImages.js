import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const loginImages = createReducer([], {
	[ActionsTypes.SET_LOGIN_IMAGES](state, action) {
		if (action.loginImages.length > 0) {
			return action.loginImages;
		}
		return state;
	}
});
export const mainMenuImages = createReducer([], {
	[ActionsTypes.SET_MAIN_MENU_IMAGES](state, action) {
		return action.mainMenuImages;
	}
});
export const promotionsData = createReducer([], {
	[ActionsTypes.SET_PROMOTIONS](state, action) {
		return action.promotions;
	}
});
export const routinesImages = createReducer([], {
	[ActionsTypes.SET_ROUTINES_IMAGES](state, action) {
		if (action.routinesImages.length > 0) {
			return action.routinesImages;
		}
		return state;
	}
});
export const classesImages = createReducer([], {
	[ActionsTypes.SET_CLASSES_IMAGES](state, action) {
		return action.classesImages;
	}
});
export const timetableImages = createReducer([], {
	[ActionsTypes.SET_TIMETABLE_IMAGES](state, action) {
		return action.timetableImages;
	}
});
export const synchedImagesParameters = createReducer(
	{ loginImages: { imageIndex: 0 } },
	{
		[ActionsTypes.SET_SYNCHED_IMAGES_PARAMETERS](state, action) {
			return action.synchedImagesParamters;
		}
	}
);
