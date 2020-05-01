import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export default createReducer("", {
  [ActionsTypes.SET_CURRENT_HOME_DRAWER_OPTION](state, action) {
    return action.currentHomeDrawerOption;
  },
});
