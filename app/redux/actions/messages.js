import { ActionsTypes } from "/config/settings";

export function setMessages(messages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_MESSAGES,
			messages
		});
	};
}

export function addMessage(messages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.ADD_MESSAGE,
			messages
		});
	};
}
