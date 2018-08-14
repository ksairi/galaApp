import { sendMessages as sendMessagesApi } from "/helpers/ApiHelper";
import { ActionsCreators } from "/redux/actions";

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

export const sendUnsentMessages = async (
	userId,
	deviceId,
	messages,
	dispatch
) => {
	const unsentMessages = getUnsentMessages(messages);
	const sentMessages = await sendMessages(userId, deviceId, unsentMessages);
	if (sentMessages) {
		dispatch(ActionsCreators.setSentMessages(sentMessages));
	}
};

export const getUnsentMessages = messages =>
	messages.filter(message => !message.serverTime);

export const setMessageLoginSynchedDataParameters = (
	lastMessageTs,
	messages,
	dispatch
) => {
	var newLastMessageTs = null;
	if (lastMessageTs == null) {
		if (messages && messages.length > 0) {
			newLastMessageTs = messages[0].serverTime;
		}
	} else {
		newLastMessageTs = lastMessageTs;
	}
	if (newLastMessageTs) {
		dispatch(
			ActionsCreators.setLastTimeStampMessage({
				entity: messages,
				data: { lastMessageTime }
			})
		);
	}
};
