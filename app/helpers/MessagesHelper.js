import { sendMessages as sendMessagesApi } from "/helpers/ApiHelper";

export const sendMessages = async (userId, deviceId, messages) => {
	try {
		const params = {};
		params.userId = userId;
		params.deviceId = deviceId;
		params.messages = messages;
		const sentMessagesReponse = await sendMessagesApi(params);
		return sentMessagesReponse.messages;
	} catch (error) {
		return null;
	}
};
