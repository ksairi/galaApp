import { ActionsTypes } from "/config/settings";

export function setMessages(messages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_MESSAGES,
			messages
		});
	};
}

export function addMessages(messages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.ADD_MESSAGES,
			messages
		});
	};
}

export function setSentMessages(messages) {
	return (dispatch, getState) => {
		dispatch({
			type: ActionsTypes.SET_SENT_MESSAGES,
			messages
		});
	};
}
