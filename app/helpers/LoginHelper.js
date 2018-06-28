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
	synchedDataParameters,
	lastSynchedTimestamp,
	dispatch
) => {
	const loginResponse = await loginApi(userId, password);
	return fetchDynamicData(
		loginResponse,
		userId,
		password,
		synchedDataParameters,
		lastSynchedTimestamp,
		dispatch
	);
};

exports.register = async (
	fullName,
	userId,
	password,
	deviceToken,
	synchedDataParameters,
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
			synchedDataParameters,
			null,
			dispatch
		);
	}
};

fetchDynamicData = async (
	response,
	userId,
	password,
	synchedDataParameters,
	lastSynchedTimestamp,
	dispatch
) => {
	if (response[ServerProtocol.statusField] == ServerProtocol.OK) {
		try {
			var contentServerResponse = true;
			if (
				lastSynchedTimestamp == null ||
				(Date.now() - lastSynchedTimestamp) / 1000 > 10 //   / 1000 / 60 / 60 > 24
			) {
				//synched content server daily
				contentServerResponse = await doFetchDynamicData(
					synchedDataParameters,
					dispatch
				);
			}
			if (contentServerResponse) {
				setInitialData(response.data, userId, password, dispatch);
				return { [ServerProtocol.statusField]: ServerProtocol.OK };
			}
			return { [ServerProtocol.messageField]: Messages.NO_SPACE_IN_DISK };
		} catch (errorMessage) {
			return { [ServerProtocol.messageField]: errorMessage };
		}
	} else {
		return {
			[ServerProtocol.messageField]: response[ServerProtocol.messageField]
		};
	}
};

doFetchDynamicData = async (synchedDataParameters, dispatch) => {
	const params = {};
	params.loginImages = getLoginImagesParams(synchedDataParameters.loginImages);
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
