import { PixelRatio, Dimensions } from "react-native";
import {
	login as loginApi,
	register as registerApi,
	fetchDynamicData as fetchDynamicDataApi
} from "/helpers/ApiHelper";
import { ServerProtocol } from "/config/settings";
import {
	setInitialData,
	clearStore,
	setContentServerData
} from "/helpers/StoreHelper";

exports.login = async (
	userId,
	password,
	synchedImagesParameters,
	lastSynchedTimestamp,
	dispatch
) => {
	const loginResponse = await loginApi(userId, password);
	return fetchDynamicData(
		loginResponse,
		userId,
		password,
		synchedImagesParameters,
		lastSynchedTimestamp,
		dispatch
	);
};

exports.register = async (
	fullName,
	userId,
	password,
	deviceToken,
	synchedImagesParameters,
	dispatch
) => {
	const registerResponse = await registerApi(
		fullName,
		userId,
		password,
		deviceToken
	);
	if (registerResponse[ServerProtocol.statusField] == ServerProtocol.OK) {
		clearStore(dispatch);
		return fetchDynamicData(
			registerResponse,
			userId,
			password,
			synchedImagesParameters,
			null,
			dispatch
		);
	}
};

fetchDynamicData = async (
	response,
	userId,
	password,
	synchedImagesParameters,
	lastSynchedTimestamp,
	dispatch
) => {
	if (response[ServerProtocol.statusField] == ServerProtocol.OK) {
		try {
			if (
				lastSynchedTimestamp == null ||
				(Date.now() - lastSynchedTimestamp) / 1000 / 60 > 15
			) {
				//synched content server after 15 min of last update
				await doFetchDynamicData(synchedImagesParameters, dispatch);
			}
			setInitialData(response.data, userId, password, dispatch);
			return { [ServerProtocol.statusField]: ServerProtocol.OK };
		} catch (errorMessage) {
			return { [ServerProtocol.messageField]: errorMessage };
		}
	} else {
		return {
			[ServerProtocol.messageField]: response[ServerProtocol.messageField]
		};
	}
};

doFetchDynamicData = (synchedImagesParameters, dispatch) => {
	const params = {};
	params.loginImages = getLoginImagesParams(
		synchedImagesParameters.loginImages
	);
	params.mainMenuImages = getMainMenuImagesParams(
		synchedImagesParameters.mainMenuImages
	);
	params.promotions = getPromotionsParams(synchedImagesParameters.promotions);

	params.routinesImages = getRoutinesImagesParams(
		synchedImagesParameters.routinesImages
	);
	params.classesImages = getClassesImagesParams(
		synchedImagesParameters.classesImages
	);
	fetchDynamicDataApi(params).then(dynamicDataResponse => {
		setContentServerData(dynamicDataResponse, dispatch);
	});
};

getLoginImagesParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		Dimensions.get("window").width
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205);
	return params;
};

getMainMenuImagesParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		Dimensions.get("window").width
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205);
	return params;
};

getPromotionsParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		Dimensions.get("window").width * 0.89
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205 * 0.89);
	return params;
};

getRoutinesImagesParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		Dimensions.get("window").width
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205);
	return params;
};

getClassesImagesParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		Dimensions.get("window").width
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205);
	return params;
};

exports.doFetchDynamicData = doFetchDynamicData;
