import { ActionsCreators } from "/redux/actions";
import { syncLocalStorage } from "/helpers/ApiHelper";
import { Messages } from "/config/settings";

exports.setInitialData = (loginServerData, userId, password, dispatch) => {
	const { userData, newMemberData, routines } = loginServerData;
	userData.userId = userId;
	userData.password = password;

	dispatch(ActionsCreators.logIn());
	dispatch(ActionsCreators.setAutoLoginErrorMessage(""));
	if (userData) {
		const userDataCopy = { ...userData };
		delete userDataCopy.receivePushNotifications;

		dispatch(ActionsCreators.setUserData(userDataCopy));
		dispatch(
			ActionsCreators.setReceiveNotifications({
				value: userData.receivePushNotifications,
				synched: false
			})
		);
	}
	dispatch(ActionsCreators.setNewMemberData(newMemberData));
	dispatch(ActionsCreators.setRoutines(routines));
};

exports.setContentServerData = async (contentServerData, dispatch) => {
	if (contentServerData) {
		const {
			//loginImages,
			mainMenuImages,
			promotions,
			//routinesImages,
			//classesImages,
			//timetableImages,
			timetable,
			sentMessages,
			messages
		} = contentServerData;
		/*await saveDataToDevice(
			loginImages,
			"loginImage",
			ActionsCreators.setLoginImages,
			ActionsCreators.removeLoginImage,
			dispatch
		);*/
		await saveMainMenuImages(mainMenuImages, dispatch);

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
		saveMessagesToDevice(messages, sentMessages, dispatch);
	}
};

exports.clearStore = dispatch => {
	dispatch(ActionsCreators.setUserData({}));
	dispatch(ActionsCreators.setNewMemberData({}));
	dispatch(ActionsCreators.setTimetable(null));
	dispatch(ActionsCreators.setRoutines(null));
	dispatch(ActionsCreators.setMessages(null));
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
				(dataItem.imageIndex ? dataItem.imageIndex : dataItem.id) +
				"." +
				dataItem.imageExt;
			if (dataItem.imageUrl) {
				dispatch(ActionsCreators.setIsDownloadingRemoteImages(true));
				return Expo.FileSystem.downloadAsync(dataItem.imageUrl, fileUri)
					.then(({ uri }) => {
						return {
							...dataItem,
							uri
						};
					})
					.catch(error => {
						console.log(error);
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
					dataToRemove = [],
					newParameters = { indexesToAdd: [], indexesToRemove: [] };
				newDataArray.forEach(newData => {
					if (newData.uri) {
						dataToAdd.push(newData);
						if (newData.imageIndex) {
							newParameters.indexesToAdd.push(parseInt(newData.imageIndex));
						}
					} else {
						if (newData.imageIndex) {
							dataToRemove.push(newData.imageIndex);
						} else {
							dataToRemove.push(newData.id); //promotions
						}
						if (newData.imageIndex) {
							newParameters.indexesToRemove.push(parseInt(newData.imageIndex));
						}
					}
				});
				if (dataToAdd.length > 0) {
					dispatch(addAction(dataToAdd));
					dispatch(ActionsCreators.setIsDownloadingRemoteImages(false));
				}
				if (dataToRemove.length > 0) {
					dispatch(removeAction(dataToRemove));
				}

				return newParameters;
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

export const saveMainMenuImages = async (mainMenuImages, dispatch) => {
	const updatedIndexes = await saveDataToDevice(
		mainMenuImages,
		"mainMenuImage",
		ActionsCreators.setMainMenuImages,
		ActionsCreators.removeMainMenuImages,
		dispatch
	);

	const dataNewState = {};
	dataNewState.entity = "mainMenuImages";
	dataNewState.data = { updatedIndexes };
	dispatch(ActionsCreators.setLoginSynchedDataParameters(dataNewState));
};

export const saveMessagesToDevice = (messages, sentMessages, dispatch) => {
	if (messages && messages.length > 0) {
		dispatch(ActionsCreators.setMessages(messages));
	}
	if (sentMessages && sentMessages.length > 0) {
		dispatch(ActionsCreators.setSentMessages(sentMessages));
	}

	setMessageLoginSynchedDataParameters(
		messages && messages.length > 0
			? messages[messages.length - 1].index
			: null,
		sentMessages,
		dispatch
	);
};

export const setMessageLoginSynchedDataParameters = (
	lastMessageIndex,
	sentMessages,
	dispatch
) => {
	var newLastMessageIndex = null;
	if (sentMessages && sentMessages.length > 0) {
		newLastMessageIndex = sentMessages[sentMessages.length - 1].index;
	} else {
		newLastMessageIndex = lastMessageIndex;
	}
	if (newLastMessageIndex != null) {
		dispatch(
			ActionsCreators.setLoginSynchedDataParameters({
				entity: "messages",
				data: { lastMessageIndex: newLastMessageIndex }
			})
		);
	}
};

saveTimetableToDevice = (timetable, dispatch) => {
	dispatch(ActionsCreators.setTimetable(timetable));
};
