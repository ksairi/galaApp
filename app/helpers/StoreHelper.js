//import Base64 from "/utils/Base64";
import { ServerProtocol } from "/config/settings";
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
	dispatch(ActionsCreators.setIsUsingCache(false));
	dispatch(ActionsCreators.setRoutines(routines));
	dispatch(ActionsCreators.setNotifications(notifications));
};

exports.setContentServerData = async (contentServerData, dispatch) => {
	if (contentServerData) {
		const {
			loginImages,
			mainMenuImages,
			promotionsData,
			routinesImages,
			classesImages,
			timetableImages,
			timetable
		} = contentServerData;
		try {
			await saveImagesToDevice(
				loginImages,
				"loginImage",
				ActionsCreators.setLoginImages,
				dispatch
			);
			await saveImagesToDevice(
				mainMenuImages,
				"mainMenuImage",
				ActionsCreators.setMainMenuImages,
				dispatch
			);

			await saveDataToDevice(
				promotionsData,
				"promotionImage",
				ActionsCreators.setPromotions,
				dispatch
			);

			/*saveImagesToDevice(
				routinesImages,
				"routinesImage",
				ActionsCreators.setRoutinesImages,
				dispatch
			);
	
			saveImagesToDevice(
				classesImages,
				"classesImage",
				ActionsCreators.setClassesImages,
				dispatch
			);
	
			saveImagesToDevice(
				timetableImages,
				"timetableImage",
				ActionsCreators.setTimetableImages,
				dispatch
			);
	
			dispatch(ActionsCreators.setTimetable(timetable));*/
			dispatch(ActionsCreators.setLastSynchedTimestamp(Date.now()));
			return true;
		} catch (error) {
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

saveImagesToDevice = (imagesData, prefix, action, dispatch) => {
	if (imagesData) {
		const newImagesPromises = imagesData.map((imageItem, index) => {
			const fileName = Expo.FileSystem.documentDirectory + prefix + index; //+ ".jpg";
			//let binaryImage = Base64.atob(imageItem.image);
			return Expo.FileSystem.writeAsStringAsync(fileName, imageItem.image)
				.then(() => {
					return {
						...imageItem,
						image: fileName
					};
				})
				.catch(error => {
					console.log(error);
					throw error;
				});
		});

		return Promise.all(newImagesPromises)
			.then(newImagesData => {
				if (dispatch && action) {
					dispatch(action(newImagesData));
				} else {
					return newImagesData;
				}
			})
			.catch(() => {
				console.log(error);
				throw error;
			});
	}
};

saveDataToDevice = (data, prefix, action, dispatch) => {
	const newPromotionsPromise = saveImagesToDevice(data.promotions, prefix);
	if (newPromotionsPromise) {
		newPromotionsPromise
			.then(newPromotions => {
				const newData = { ...data, promotions: newPromotions };
				dispatch(action(newData));
			})
			.catch(error => {
				throw error;
			});
	}
};
