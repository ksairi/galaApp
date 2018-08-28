import { ActionsTypes } from "/config/settings";

export function setIsDownloadingRemoteImages(isDownloadingRemoteImages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_IS_DOWNLOADING_REMOTE_IMAGES,
			isDownloadingRemoteImages
		});
	};
}
