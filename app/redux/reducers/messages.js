import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const messages = createReducer([], {
	[ActionsTypes.SET_MESSAGES](state, action) {
		if (action.messages) {
			const stateCopy = [...state];
			action.messages.forEach(message => {
				const index = getMessageIndex(state, message);
				if (index == -1) {
					stateCopy = [message, ...stateCopy];
				}
			});
			return stateCopy;
		}
		return [];
	},
	[ActionsTypes.SET_SENT_MESSAGES](state, action) {
		const stateCopy = [...state];
		action.messages.forEach(messageWithServerStamp => {
			const index = stateCopy.findIndex(
				stateMessage => stateMessage._id == messageWithServerStamp._id
			);
			if (index != -1) {
				stateCopy[index].serverTime = messageWithServerStamp.serverTime;
			}
		});
		return stateCopy;
	},
	[ActionsTypes.DELETE_MESSAGE](state, action) {
		if (action.message) {
			const index = getMessageIndex(state, action.message);
			return [...state.slice(0, index), ...state.slice(index + 1)];
		}
		return state;
	}
});

export const hasShownUnsentMessagesDialog = createReducer(false, {
	[ActionsTypes.SET_HAS_SHOWN_UNSENT_MESSAGES_DIALOG](state, action) {
		return true;
	}
});

export const newMessagesCount = createReducer(0, {
	[ActionsTypes.SET_NEW_MESSAGES_COUNT](state, action) {
		if (!action.value) {
			return 0;
		}
		return state + action.value;
	}
});

function getMessageIndex(stateMessages, message) {
	return stateMessages.findIndex(
		stateMessage => stateMessage._id == message._id
	);
}
