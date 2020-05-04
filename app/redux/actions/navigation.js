import {ActionsTypes} from "config/settings";

// eslint-disable-next-line import/prefer-default-export
export function setCurrentHomeDrawerOption(currentHomeDrawerOption) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_CURRENT_HOME_DRAWER_OPTION,
      currentHomeDrawerOption,
    });
  };
}
