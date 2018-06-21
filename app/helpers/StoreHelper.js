import Base64 from "/utils/Base64";
import { ServerProtocol } from "/config/settings";
import { ActionsCreators } from "/redux/actions";
import { syncLocalStorage } from "/helpers/ApiHelper";

exports.setInitialData = (
	loginServerData,
	userId,
	password,
	contentServerData,
	dispatch
) => {
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

		saveImagesToDevice(
			loginImages,
			"loginImage",
			ActionsCreators.setLoginImages,
			dispatch
		);

		saveImagesToDevice(
			mainMenuImages,
			"mainMenuImage",
			ActionsCreators.setMainMenuImages,
			dispatch
		);

		/*saveImagesToDevice(
			promotionsData,
			"promotionImage",
			ActionsCreators.setPromotions,
			dispatch
		);

		saveImagesToDevice(
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

		//dispatch(ActionsCreators.setPromotions(promotionsData));
		//dispatch(ActionsCreators.setRoutinesImages(routinesImages));
		//dispatch(ActionsCreators.setClassesImages(classesImages));
		//dispatch(ActionsCreators.setTimetableImages(timetableImages));
		//dispatch(ActionsCreators.setTimetable(timetable));
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
	const newImagesPromises = imagesData.map((imageItem, index) => {
		const fileName =
			Expo.FileSystem.documentDirectory + prefix + index + ".jpg";
		let binaryImage = Base64.atob(imageItem.image);
		return Expo.FileSystem.writeAsStringAsync(fileName, binaryImage)
			.then(() => {
				console.log(fileName);
				console.log("success");
				return {
					...imageItem,
					image: fileName
				};
			})
			.catch(error => {
				console.log(error);
			});
	});

	Promise.all(newImagesPromises).then(function(newImagesData) {
		dispatch(action(newImagesData));
	});
};
