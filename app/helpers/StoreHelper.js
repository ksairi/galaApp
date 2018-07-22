import { ActionsCreators } from "/redux/actions";
import { syncLocalStorage } from "/helpers/ApiHelper";

exports.setInitialData = (loginServerData, userId, password, dispatch) => {
	const { userData, newMemberData, routines, notifications } = loginServerData;
	userData.userId = userId;
	userData.password = password;

	dispatch(ActionsCreators.logIn());
	dispatch(ActionsCreators.setAutoLoginErrorMessage(""));
	dispatch(ActionsCreators.setUserData(userData));
	dispatch(ActionsCreators.setNewMemberData(newMemberData));
	dispatch(ActionsCreators.setRoutines(routines));
	dispatch(ActionsCreators.setNotifications(notifications));
};

exports.setContentServerData = async (contentServerData, dispatch) => {
	if (contentServerData) {
		const {
			loginImages,
			mainMenuImages,
			promotions,
			routinesImages,
			classesImages,
			timetableImages,
			timetable
		} = contentServerData;
		try {
			await saveDataToDevice(
				loginImages,
				"loginImage",
				ActionsCreators.setLoginImages,
				ActionsCreators.removeLoginImage,
				dispatch
			);
			await saveDataToDevice(
				mainMenuImages,
				"mainMenuImage",
				ActionsCreators.setMainMenuImages,
				ActionsCreators.removeMainMenuImage,
				dispatch
			);

			await savePromotionsData(promotions, dispatch);

			/*saveDataToDevice(
				routinesImages,
				"routinesImage",
				ActionsCreators.setRoutinesImages,
				ActionsCreators.
				dispatch
			);
	
			saveDataToDevice(
				classesImages,
				"classesImage",
				ActionsCreators.setClassesImages,
				ActionsCreators.
				dispatch
			);
	
			saveDataToDevice(
				timetableImages,
				"timetableImage",
				ActionsCreators.setTimetableImages,
				ActionsCreators.
				dispatch
			);*/

			dispatch(ActionsCreators.setTimetable(timetable));
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
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

export const saveDataToDevice = (
	imagesData,
	prefix,
	addAction,
	removeAction,
	dispatch
) => {
	if (imagesData) {
		const newDataPromises = imagesData.map(dataItem => {
			const fileUri =
				Expo.FileSystem.documentDirectory +
				prefix +
				(dataItem.imageIndex ? dataItem.imageIndex : dataItem.id);
			if (dataItem.imageUrl) {
				return Expo.FileSystem.downloadAsync(dataItem.imageUrl, fileUri)
					.then(({ uri }) => {
						return {
							...dataItem,
							uri
						};
					})
					.catch(error => {
						console.log(error);
						throw error;
					});
			} else {
				return Expo.FileSystem.deleteAsync(fileUri, { idempotent: false })
					.then(() => {
						return dataItem;
					})
					.catch(error => {
						console.log(error);
						return true;
					});
			}
		});
		return Promise.all(newDataPromises)
			.then(newDataArray => {
				const dataToAdd = [],
					dataToRemove = [],
					response = {};
				response.activeDataIds = [];
				response.noActiveDataIds = [];
				newDataArray.forEach(newData => {
					if (newData.uri) {
						dataToAdd.push(newData);
						response.activeDataIds.push(newData.id);
					} else {
						dataToRemove.push(newData);
						response.noActiveDataIds.push(newData.id);
					}
				});
				if (dataToAdd.length > 0) {
					dispatch(addAction(dataToAdd));
				}
				if (dataToRemove.length > 0) {
					dispatch(removeAction(dataToRemove));
				}

				return response;
			})
			.catch(error => {
				console.log(error);
				throw error;
			});
	}
};

export const savePromotionsData = async (promotions, dispatch) => {
	const dataNewState = await saveDataToDevice(
		promotions.data,
		"promotionImage",
		ActionsCreators.setPromotions,
		ActionsCreators.removePromotionItem,
		dispatch
	);
	dataNewState.entity = "promotions";
	dataNewState.data = { lastUpdate: promotions.lastUpdate };
	dispatch(ActionsCreators.setLoginSynchedDataParameters(dataNewState));
};
