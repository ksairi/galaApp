import { ActionsTypes } from '/config/settings'


export function setUserData (userData){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_USER_DATA, userData})
  }
}

export function setNotificationToken (notificationToken){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_NOTIFICATION_TOKEN, notificationToken})
  }
}
