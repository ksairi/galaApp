import {ActionsTypes} from "config/settings";

export function setLoginImages(loginImages) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_LOGIN_IMAGES, loginImages});
  };
}

export function setMainMenuImages(mainMenuImages) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_MAIN_MENU_IMAGES,
      mainMenuImages,
    });
  };
}

export function removeMainMenuImages(mainMenuImageIndexesToRemove) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.REMOVE_MAIN_MENU_IMAGES,
      mainMenuImageIndexesToRemove,
    });
  };
}

export function setClassesImages(classesImages) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_CLASSES_IMAGES,
      classesImages,
    });
  };
}

export function setTimetableImages(timetableImages) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_TIMETABLE_IMAGES,
      timetableImages,
    });
  };
}
export function setSynchedDataParameters(synchedDataParameters) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_SYNCHED_DATA_PARAMETERS,
      synchedDataParameters,
    });
  };
}
export function setLoginSynchedDataParameters(loginSynchedDataParameters) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_LOGIN_SYNCHED_DATA_PARAMETERS,
      loginSynchedDataParameters,
    });
  };
}
