import { ActionsTypes } from '/config/settings'

export function setNotifications (notifications){
	return (dispatch, getState) => {
    dispatch({type: ActionsTypes.SET_NOTIFICATIONS, notifications})
	}
 }

 export function setNotificationsToken (notificationsToken){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_NOTIFICATIONS_TOKEN, notificationsToken})
  }
}

 export function setReadNotification(index){
 	return (dispatch, getState) =>{
 		dispatch({type:ActionsTypes.SET_READ_NOTIFICATION, index})
 	}
 }