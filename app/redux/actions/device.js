import { ActionsTypes } from "/config/settings";

export function setCurrentOrientation(orientation) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_CURRENT_ORIENTATION, orientation });
	};
}

export function setDeviceId(deviceId) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_DEVICE_ID, deviceId });
	};
}
