import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export const isLoggedIn = createReducer(false, {
  [ActionsTypes.LOG_IN]() {
    return true;
  },
  [ActionsTypes.LOG_OUT]() {
    return false;
  },
});

export const isAppsFirstTime = createReducer(true, {
  [ActionsTypes.SET_IS_APPS_FIRST_TIME](state, action) {
    return action.state;
  },
});

export const hasResetFirstPassword = createReducer(false, {
  [ActionsTypes.SET_HAS_RESET_FIRST_PASSWORD](state, action) {
    return action.hasResetFirstPassword;
  },
});

export const inResetFirstPasswordMode = createReducer(false, {
  [ActionsTypes.SET_IN_RESET_FIRT_PASSWORD_MODE](state, action) {
    return action.inResetFirstPasswordMode;
  },
});

export const isSavingNotificationsData = createReducer(false, {
  [ActionsTypes.SET_IS_SAVING_NOTIFICATIONS_DATA](state, action) {
    return action.isSavingNotificationsData;
  },
});

export const isInSession = createReducer(false, {
  [ActionsTypes.SET_IS_IN_SESSION](state, action) {
    return action.isInSession;
  },
});

export const goToMobileWebLogin = createReducer(false, {
  [ActionsTypes.SET_GO_TO_MOBILE_WEB_LOGIN](state, action) {
    return action.value;
  },
});
