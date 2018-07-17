import { ActionsTypes } from "/config/settings";

export function setNotifications(notifications) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_NOTIFICATIONS, notifications });
	};
}

export function setReadNotification(index) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_READ_NOTIFICATION, index });
	};
}

export function setNotificationsSyncFlags(
	receivedNotificationsKeys,
	readNotificationsKeys
) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_NOTIFICATIONS_SYNC_FLAGS,
			receivedNotificationsKeys,
			readNotificationsKeys
		});
	};
}
