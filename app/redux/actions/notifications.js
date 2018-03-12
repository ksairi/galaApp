import { ActionsTypes, Keys } from '/config/settings'

export function setNotifications (newNotifications){
	return async (dispatch, getState) => {
		try{
		    var notifications = getState().notifications
		    var newNotificationsToApply = []
	      newNotifications.forEach(newNotification =>{
	      	const found = notifications.find(notification=> notification.key == newNotification.key)
	      	if(!found){
	      		if(newNotification.unRead == null){
	          		newNotification.unRead = true    
	        		}
	      		newNotificationsToApply = [newNotification, ...newNotificationsToApply]
	      	}
	      })
	      notifications = [...newNotificationsToApply, ...notifications]
	      dispatch({type: ActionsTypes.SET_NOTIFICATIONS, notifications})
		}catch(error){
		  //throw Messages.SYSTEM_ERROR
		  //TODO show error on potential sliding frame from top
		}
	}
 }