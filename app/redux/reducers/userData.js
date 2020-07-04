import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export const userData = createReducer(
  {},
  {
    [ActionsTypes.SET_USER_DATA](state, action) {
      return {...state, ...action.userData};
    },
    [ActionsTypes.SET_NEW_PASSWORD](state, action) {
      return {...state, password: action.password};
    },
    [ActionsTypes.CLEAN_FREE_PASS_END_DATE](state) {
      return {...state, freePassEndDate: null};
    },
  }
);

export const newMemberData = createReducer(null, {
  [ActionsTypes.SET_NEW_MEMBER_DATA](state, action) {
    if (action.newMemberData != null) {
      const newMemberData = {
        ...action.newMemberData,
        freeEntryData: {
          ...action.newMemberData.freeEntryData,
          date: Date.now(),
        },
      };
      return newMemberData;
    }
    return state;
  },
});

export const profilePicture = createReducer(null, {
  [ActionsTypes.SET_PROFILE_PICTURE](_state, action) {
    return action.profilePicture;
  },
  [ActionsTypes.SET_PROFILE_PICTURE_SYNCHED](state) {
    return {...state, synched: true};
  },
});

export const receiveNotifications = createReducer(null, {
  [ActionsTypes.SET_RECEIVE_NOTIFICATIONS](_state, action) {
    return action.obj;
  },
  [ActionsTypes.SET_RECEIVE_NOTIFICATIONS_SYNCHED](state) {
    return {...state, synched: true};
  },
});

export const lastDateShowingFreePassEnding = createReducer(null, {
  [ActionsTypes.SET_LAST_DATE_SHOWING_FREE_PASS_ENDING](_state, action) {
    return action.date;
  },
});
