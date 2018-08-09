import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const messages = createReducer([], {
	[ActionsTypes.SET_MESSAGES](state, action) {
		return action.messages;
	},
	[ActionsTypes.ADD_MESSAGES](state, action) {
		if (action.messages) {
			const initialIndex = 0;
			const newMessages = [...action.messages, ...state];
			newMessages.forEach(message => {
				message.index = initialIndex++;
			});
			return [...newMessages];
		}
		return state;
	},
	[ActionsTypes.SET_SENT_MESSAGES](state, action) {
		const stateCopy = [...state];
		action.messages.forEach(message => {
			stateCopy[message.index].serverTime = message.serverTime;
		});

		return stateCopy;
	}
});
