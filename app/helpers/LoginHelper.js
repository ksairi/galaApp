import { PixelRatio } from "react-native";
import {
	login as loginApi,
	register as registerApi,
	fetchDynamicData as fetchDynamicDataApi,
	setContentSaved as setContentSavedApi
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
		const loginResponse = await loginApi(userId, password, deviceId);
		return fetchDynamicData(
			loginResponse,
			null,
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
			fullName,
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
	fullName,
	userId,
	password,
	deviceId,
	synchedDataParameters,
	dispatch
) => {
	try {
		var fetchAndSaveContentServerResponse = await doFetchDynamicData(
			synchedDataParameters,
			fullName,
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
	fullName,
	userId,
	deviceId,
	dispatch
) => {
	const params = { ...synchedDataParameters };
	if (params.isLoginRequest) {
		params.userId = userId;
		params.deviceId = deviceId;
		params.fullName = fullName;
		params.deviceWidth = PixelRatio.getPixelSizeForLayoutSize(
			ScreenDimensions.getPortraitWidth()
		);
	}
	const dynamicDataResponse = await fetchDynamicDataApi(params);
	if (hasResponseResults(dynamicDataResponse)) {
		setContentSavedApi({ userId, deviceId });
		return setContentServerData(dynamicDataResponse, dispatch);
	}
	return true;
};

hasResponseResults = response =>
	response.promotions &&
	response.promotions.data &&
	response.promotions.data.length > 0;

exports.doFetchDynamicData = doFetchDynamicData;
