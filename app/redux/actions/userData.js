import {ActionsTypes} from "config/settings";
import {fetchUserData} from "helpers/ApiHelper";

export function setUserData(userData) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_USER_DATA, userData});
  };
}

export function setNewMemberData(newMemberData) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_NEW_MEMBER_DATA, newMemberData});
  };
}

export function fetchUserStore() {
  return (dispatch, getState) => {
    if (getState().userData.userId) {
      fetchUserData(getState().userData.userId).then(
        (response) => {
          const {routines} = response.data;
          dispatch({type: ActionsTypes.SET_ROUTINES, routines});
        },
        () => {}
      );
    }
  };
}

export function setUserNewPassword(password) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_NEW_PASSWORD, password});
  };
}

export function setProfilePicture(profilePicture) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_PROFILE_PICTURE, profilePicture});
  };
}

export function setProfilePictureSynched() {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_PROFILE_PICTURE_SYNCHED});
  };
}

export function setReceiveNotifications(obj) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_RECEIVE_NOTIFICATIONS, obj});
  };
}

export function setReceiveNotificationsSynched() {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_RECEIVE_NOTIFICATIONS_SYNCHED});
  };
}

export function setLastDateShowingFreePassEnding(date) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_LAST_DATE_SHOWING_FREE_PASS_ENDING, date});
  };
}

export function cleanFreePassEndDate() {
  return (dispatch) => {
    dispatch({type: ActionsTypes.CLEAN_FREE_PASS_END_DATE});
  };
}
