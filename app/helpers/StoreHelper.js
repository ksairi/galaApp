import { ServerProtocol } from "/config/settings";
import { ActionsCreators } from "/redux/actions";
import { syncLocalStorage } from "/helpers/ApiHelper";

exports.setInitialData = (serverData, userId, password, dispatch) => {
	const {
		userData,
		newMemberData,
		timetable,
		routines,
		notifications
	} = serverData;
	userData.userId = userId;
	userData.password = password;
	dispatch(ActionsCreators.logIn());
	dispatch(ActionsCreators.setAutoLoginErrorMessage(""));
	dispatch(ActionsCreators.setUserData(userData));
	dispatch(ActionsCreators.setNewMemberData(newMemberData));
	dispatch(ActionsCreators.setIsUsingCache(false));
	dispatch(ActionsCreators.setTimetable(timetable));
	dispatch(ActionsCreators.setRoutines(routines));
	dispatch(ActionsCreators.setNotifications(notifications));
};

exports.clearStore = dispatch => {
	dispatch(ActionsCreators.setUserData({}));
	dispatch(ActionsCreators.setNewMemberData({}));
	dispatch(ActionsCreators.setTimetable(null));
	dispatch(ActionsCreators.setRoutines(null));
	dispatch(ActionsCreators.setNotifications(null));
};

exports.syncStoreWithServer = (userId, notifications, dispatch) => {
	if (userId) {
		var readNotificationsKeys = [],
			receivedNotificationsKeys = [];

		notifications.forEach(notification => {
			if (!notification.receivedFlagSynched) {
				receivedNotificationsKeys.push(notification.key);
			}

			if (!notification.unRead && !notification.unReadFlagSynched) {
				readNotificationsKeys.push(notification.key);
			}
		});
		if (
			receivedNotificationsKeys.length > 0 ||
			readNotificationsKeys.length > 0
		) {
			syncLocalStorage(userId, receivedNotificationsKeys, readNotificationsKeys)
				.then(response => {
					if (response[ServerProtocol.statusField] == ServerProtocol.OK)
						dispatch(
							ActionsCreators.setNotificationsSyncFlags(
								receivedNotificationsKeys,
								readNotificationsKeys
							)
						);
				})
				.catch(error => {});
		}
	}
};
