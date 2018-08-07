import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const messages = createReducer([], {
	[ActionsTypes.SET_MESSAGES](state, action) {
		return action.messages;
	},
	[ActionsTypes.ADD_MESSAGE](state, action) {
		if (action.messages) {
			return [...action.messages, ...state];
		}
		return state;
	}
});
