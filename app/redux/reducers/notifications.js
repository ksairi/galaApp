import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export const isDownloadingRemoteImages = createReducer(false, {
  [ActionsTypes.SET_IS_DOWNLOADING_REMOTE_IMAGES](state, action) {
    return action.isDownloadingRemoteImages;
  },
});

export const notificationsText = createReducer("", {
  [ActionsTypes.SET_NOTIFICATIONS_TEXT](state, action) {
    if (!action.notificationsText) {
      return "";
    }
    return action.notificationsText;
  },
});
