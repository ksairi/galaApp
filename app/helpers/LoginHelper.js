import { PixelRatio } from "react-native";
import {
	login as loginApi,
	register as registerApi,
	fetchDynamicData as fetchDynamicDataApi,
	setContentSaved as setContentSavedApi
} from "/helpers/ApiHelper";
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
	const loginResponse = await loginApi(userId, password, deviceId);
	await fetchDynamicData(
		loginResponse,
		null,
		userId,
		password,
		deviceId,
		loginSynchedDataParameters,
		dispatch
	);
};

exports.register = async (
	fullName,
	userId,
	password,
	deviceId,
	loginSynchedDataParameters,
	dispatch
) => {
	const registerResponse = await registerApi(
		fullName,
		userId,
		password,
		deviceId
	);

	clearStore(dispatch);
	await fetchDynamicData(
		registerResponse,
		fullName,
		userId,
		password,
		deviceId,
		loginSynchedDataParameters,
		dispatch
	);
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
	await doFetchDynamicData(
		synchedDataParameters,
		fullName,
		userId,
		deviceId,
		dispatch
	);
	setInitialData(response.data, userId, password, dispatch);
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
		await setContentServerData(dynamicDataResponse, dispatch);
	}
};

hasResponseResults = response =>
	response.promotions &&
	response.promotions.data &&
	response.promotions.data.length > 0;

exports.doFetchDynamicData = doFetchDynamicData;
