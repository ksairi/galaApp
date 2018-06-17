import {
	login as loginApi,
	fetchDynamicData as fetchDynamicDataApi
} from "/helpers/ApiHelper";
import { ServerProtocol } from "/config/settings";
import { setInitialData } from "/helpers/StoreHelper";

exports.login = async (userId, password, dispatch) => {
	const loginResponse = await loginApi(userId, password);
	if (loginResponse[ServerProtocol.statusField] == ServerProtocol.OK) {
		const dynamicDataResponse = fetchDynamicData();
		setInitialData(
			loginResponse.data,
			userId,
			password,
			dynamicDataResponse.data,
			dispatch
		);
		return { [ServerProtocol.statusField]: ServerProtocol.OK };
	}
};

fetchDynamicData = async () => {
	const dynamicDataResponse = await fetchDynamicDataApi(
		getLoginImageParams(),
		getMainMenuImagesParams(),
		getPromotionsParams(),
		getRoutinesImageParams(),
		getClassesImagesParams()
	);
	return dynamicDataResponse;
};

getLoginImageParams = () => {
	return {};
};

getMainMenuImagesParams = () => {
	return {};
};

getPromotionsParams = () => {
	return {};
};

getRoutinesImageParams = () => {
	return {};
};

getClassesImagesParams = () => {
	return {};
};

exports.fetchDynamicData = fetchDynamicData;
