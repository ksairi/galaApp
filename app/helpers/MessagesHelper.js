import { sendMessages as sendMessagesApi } from "/helpers/ApiHelper";
import { ActionsCreators } from "/redux/actions";
import { saveMessagesToDevice } from "/helpers/StoreHelper";

export const sendMessages = async (userId, deviceId, messages, dispatch) => {
	const params = {};
	params.userId = userId;
	params.deviceId = deviceId;
	params.messages = messages;
	const sentMessagesReponse = await sendMessagesApi(params);
	saveMessagesToDevice(null, sentMessagesReponse.messages, dispatch);
};

export const sendUnsentMessages = async (
	userId,
	deviceId,
	messages,
	dispatch
) => {
	const unsentMessages = getUnsentMessages(messages);
	if (unsentMessages != null && unsentMessages.length > 0) {
		const sentMessages = await sendMessages(userId, deviceId, unsentMessages);
		if (sentMessages) {
			dispatch(ActionsCreators.setSentMessages(sentMessages));
		}
	}
};

export const getUnsentMessages = messages => {
	if (messages != null) {
		return messages.filter(message => !message.serverTime);
	}
	return null;
};

export const setMessageLoginSynchedDataParameters = (
	lastMessageTs,
	messages,
	dispatch
) => {
	var newLastMessageTs = null;
	if (messages && messages.length > 0) {
		newLastMessageTs = messages[0].serverTime;
	} else {
		newLastMessageTs = lastMessageTs;
	}
	if (newLastMessageTs) {
		dispatch(
			ActionsCreators.setLoginSynchedDataParameters({
				entity: "messages",
				data: { lastMessageTimeStamp: newLastMessageTs }
			})
		);
	}
};
