import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const isDownloadingRemoteImages = createReducer(false, {
	[ActionsTypes.SET_IS_DOWNLOADING_REMOTE_IMAGES](state, action) {
		return action.isDownloadingRemoteImages;
	}
});
