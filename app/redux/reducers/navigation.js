import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

// eslint-disable-next-line import/prefer-default-export
export const currentHomeDrawerOption = createReducer("", {
  [ActionsTypes.SET_CURRENT_HOME_DRAWER_OPTION](_state, action) {
    return action.currentHomeDrawerOption;
  },
});
