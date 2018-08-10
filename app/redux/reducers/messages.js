import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const messages = createReducer([], {
	[ActionsTypes.SET_MESSAGES](state, action) {
		return action.messages;
	},
	[ActionsTypes.ADD_MESSAGES](state, action) {
		if (action.messages) {
			return [...action.messages, ...state];
		}
		return state;
	},
	[ActionsTypes.SET_SENT_MESSAGES](state, action) {
		const stateCopy = [...state];
		action.messages.forEach(messageWithStamp => {
			const index = stateCopy.findIndex(
				stateMessage => stateMessage._id == messageWithStamp._id
			);
			if (index != -1) {
				stateCopy[index].serverTime = messageWithStamp.serverTime;
			}
		});
		return stateCopy;
	}
});
