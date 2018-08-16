import { ActionsCreators } from "/redux/actions";
import { syncLocalStorage } from "/helpers/ApiHelper";
import { Messages } from "/config/settings";
import { setMessageLoginSynchedDataParameters } from "/helpers/MessagesHelper";

exports.setInitialData = (loginServerData, userId, password, dispatch) => {
	const { userData, newMemberData, routines } = loginServerData;
	userData.userId = userId;
	userData.password = password;

	dispatch(ActionsCreators.logIn());
	dispatch(ActionsCreators.setAutoLoginErrorMessage(""));
	dispatch(ActionsCreators.setUserData(userData));
	dispatch(ActionsCreators.setNewMemberData(newMemberData));
	dispatch(ActionsCreators.setRoutines(routines));
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
			timetable,
			sentMessages,
			messagesData
		} = contentServerData;
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
		saveTimetableToDevice(timetable, dispatch);
		saveMessagesToDevice(messagesData, sentMessages, dispatch);
	}
};

exports.clearStore = dispatch => {
	dispatch(ActionsCreators.setUserData({}));
	dispatch(ActionsCreators.setNewMemberData({}));
	dispatch(ActionsCreators.setTimetable(null));
	dispatch(ActionsCreators.setRoutines(null));
	//dispatch(ActionsCreators.setNotifications(null));
};
export const saveDataToDevice = (
	data,
	prefix,
	addAction,
	removeAction,
	dispatch
) => {
	if (data) {
		const newDataPromises = data.map(dataItem => {
			const fileUri =
				Expo.FileSystem.documentDirectory +
				prefix +
				(dataItem.imageIndex ? dataItem.imageIndex : dataItem.id);
			if (dataItem.imageUrl) {
				dispatch(ActionsCreators.setIsDownloadingRemoteImages(true));
				return Expo.FileSystem.downloadAsync(dataItem.imageUrl, fileUri)
					.then(({ uri }) => {
						return {
							...dataItem,
							uri
						};
					})
					.catch(() => {
						throw Messages.NO_SPACE_IN_DISK;
					});
			} else {
				return Expo.FileSystem.deleteAsync(fileUri, { idempotent: false })
					.then(() => {
						return dataItem;
					})
					.catch(error => {
						console.log(error);
					});
			}
		});
		return Promise.all(newDataPromises)
			.then(newDataArray => {
				const dataToAdd = [],
					dataToRemove = [];
				newDataArray.forEach(newData => {
					if (newData.uri) {
						dataToAdd.push(newData);
					} else {
						dataToRemove.push(newData);
					}
				});
				if (dataToAdd.length > 0) {
					dispatch(addAction(dataToAdd));
					dispatch(ActionsCreators.setIsDownloadingRemoteImages(false));
				}
				if (dataToRemove.length > 0) {
					dispatch(removeAction(dataToRemove));
				}
			})
			.catch(error => {
				throw error;
			});
	}
};

export const savePromotionsData = async (promotions, dispatch) => {
	await saveDataToDevice(
		promotions.data,
		"promotionImage",
		ActionsCreators.setPromotions,
		ActionsCreators.removePromotionItem,
		dispatch
	);
	if (promotions.lastUpdate) {
		const dataNewState = {};
		dataNewState.entity = "promotions";
		dataNewState.data = { lastUpdate: promotions.lastUpdate };
		dispatch(ActionsCreators.setLoginSynchedDataParameters(dataNewState));
	}
};

export const saveMessagesToDevice = (messagesData, sentMessages, dispatch) => {
	if (messagesData) {
		dispatch(ActionsCreators.addMessages(messagesData.messages));
	}
	if (sentMessages) {
		dispatch(ActionsCreators.setSentMessages(sentMessages));
	}

	setMessageLoginSynchedDataParameters(
		messagesData ? messagesData.lastMessageTimeStamp : null,
		sentMessages,
		dispatch
	);
};

saveTimetableToDevice = (timetable, dispatch) => {
	dispatch(ActionsCreators.setTimetable(timetable));
};
