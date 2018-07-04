import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const userData = createReducer(
	{},
	{
		[ActionsTypes.SET_USER_DATA](state, action) {
			return action.userData;
		},
		[ActionsTypes.SET_NEW_PASSWORD](state, action) {
			return { ...state, password: action.password };
		}
	}
);

export const newMemberData = createReducer(null, {
	[ActionsTypes.SET_NEW_MEMBER_DATA](state, action) {
		if (action.newMemberData == null) {
			return {};
		} else {
			return action.newMemberData;
		}
	},
	[ActionsTypes.SET_NOTIFICATIONS_NEW_MEMBER_DATA](state, action) {
		if (action.notificationsNewMemberData) {
			return {
				...state,
				freeEntryDaysLeft: action.notificationsNewMemberData.freeEntryDaysLeft
			};
		} else {
			return state;
		}
	}
});

export const isUsingCache = createReducer(false, {
	[ActionsTypes.SET_IS_USING_CACHE](state, action) {
		return action.isUsingCache;
	}
});

export const profilePicturePath = createReducer(null, {
	[ActionsTypes.SET_PROFILE_PICTURE_PATH](state, action) {
		return action.path;
	}
});
