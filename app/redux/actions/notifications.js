import { ActionsTypes } from '/config/settings'

export function setNotifications (newNotifications){
	return (dispatch, getState) => {
		if(newNotifications == null){
			dispatch({type: ActionsTypes.SET_NOTIFICATIONS, notifications:[]})
			return
		}
	    var notifications = getState().notifications
	    console.log(notifications)
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
	}
 }

 export function setReadNotification(index){
 	return (dispatch, getState) =>{
 		dispatch({type:ActionsTypes.SET_READ_NOTIFICATION, index})
 	}
 }