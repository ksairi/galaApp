import { ActionsTypes } from '/config/settings'


export function setUserData (userData){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_USER_DATA, userData})
  }
}

export function setNotificationsToken (notificationsToken){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_NOTIFICATIONS_TOKEN, notificationsToken})
  }
}
