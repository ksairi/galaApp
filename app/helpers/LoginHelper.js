import { PixelRatio } from "react-native";
import {
	login as loginApi,
	register as registerApi,
	fetchDynamicData as fetchDynamicDataApi
} from "/helpers/ApiHelper";
import { ServerProtocol, Messages } from "/config/settings";
import {
	setInitialData,
	clearStore,
	setContentServerData
} from "/helpers/StoreHelper";
import * as ScreenDimensions from "/utils/ScreenDimensions";

exports.login = async (
	userId,
	password,
	deviceId,
	loginSynchedDataParameters,
	dispatch
) => {
	try {
		const loginResponse = await loginApi(userId, password);
		return fetchDynamicData(
			loginResponse,
			userId,
			password,
			deviceId,
			loginSynchedDataParameters,
			dispatch
		);
	} catch (error) {
		throw error;
	}
};

exports.register = async (
	fullName,
	userId,
	password,
	deviceId,
	loginSynchedDataParameters,
	dispatch
) => {
	try {
		const registerResponse = await registerApi(
			fullName,
			userId,
			password,
			deviceId
		);

		clearStore(dispatch);
		return fetchDynamicData(
			registerResponse,
			userId,
			password,
			deviceId,
			loginSynchedDataParameters,
			dispatch
		);
	} catch (error) {
		throw error;
	}
};

fetchDynamicData = async (
	response,
	userId,
	password,
	deviceId,
	synchedDataParameters,
	dispatch
) => {
	try {
		var fetchAndSaveContentServerResponse = await doFetchDynamicData(
			synchedDataParameters,
			userId,
			deviceId,
			dispatch
		);

		if (fetchAndSaveContentServerResponse) {
			setInitialData(response.data, userId, password, dispatch);
			return { [ServerProtocol.statusField]: ServerProtocol.OK };
		}
		return { [ServerProtocol.messageField]: Messages.NO_SPACE_IN_DISK };
	} catch (errorMessage) {
		return { [ServerProtocol.messageField]: errorMessage };
	}
};

doFetchDynamicData = async (
	synchedDataParameters,
	userId,
	deviceId,
	dispatch
) => {
	const params = {};
	if (synchedDataParameters.isLoginRequest) {
		params.promotions = getPromotionsParams(synchedDataParameters.promotions);
		params.userId = userId;
		params.deviceId = deviceId;
	} else {
		params.loginImages = getLoginImagesParams(
			synchedDataParameters.loginImages
		);
		params.mainMenuImages = getMainMenuImagesParams(
			synchedDataParameters.mainMenuImages
		);
		params.promotions = getPromotionsParams(synchedDataParameters.promotions);

		params.routinesImages = getRoutinesImagesParams(
			synchedDataParameters.routinesImages
		);
		params.classesImages = getClassesImagesParams(
			synchedDataParameters.classesImages
		);
	}
	const dynamicDataResponse = await fetchDynamicDataApi(params);
	return setContentServerData(dynamicDataResponse, dispatch);
};

getLoginImagesParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		ScreenDimensions.getPortraitWidth().width
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205);
	return params;
};

getMainMenuImagesParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		ScreenDimensions.getPortraitWidth()
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205);
	return params;
};

getPromotionsParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		ScreenDimensions.getPortraitWidth() * 0.89
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205 * 0.89);
	return params;
};

getRoutinesImagesParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		ScreenDimensions.getPortraitWidth()
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205);
	return params;
};

getClassesImagesParams = params => {
	params = params ? params : {};
	params.width = PixelRatio.getPixelSizeForLayoutSize(
		ScreenDimensions.getPortraitWidth()
	);
	params.height = PixelRatio.getPixelSizeForLayoutSize(205);
	return params;
};

exports.doFetchDynamicData = doFetchDynamicData;
