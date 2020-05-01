import {ActionsTypes} from "config/settings";

export default function setCurrentHomeDrawerOption(currentHomeDrawerOption) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_CURRENT_HOME_DRAWER_OPTION,
      currentHomeDrawerOption,
    });
  };
}
