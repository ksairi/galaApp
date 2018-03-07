import { AsyncStorage } from 'react-native'
import { ActionsTypes, Keys } from '/config/settings'

export function saveNotifications (newNotifications){
	return async (dispatch, getState) => {
		try{
		         
		    var notificationsArray = await AsyncStorage.getItem(Keys.notifications)
		    if(!notificationsArray){
		      notificationsArray = []
		    }
		    else{
		        notificationsArray = JSON.parse(notificationsArray)
		    	}
		    var newNotificationsToApply = []
	        newNotifications.forEach(newNotification =>{
	        	const found = notificationsArray.find(notification=> notification.key == newNotification.key)
	        	if(!found){
	        		if(newNotification.unRead == null){
	            		newNotification.unRead = true    
	          		}
	        		newNotificationsToApply = [newNotification, ...newNotificationsToApply]
	        	}
	        })
	        
	        if(newNotificationsToApply.length > 0){
	          
	          notificationsArray = [...newNotificationsToApply, ...notificationsArray]
	          await AsyncStorage.setItem(Keys.notifications, JSON.stringify(notificationsArray))
	          dispatch(setNewNotifications(notificationsArray))
	        
		     }
		  
		}catch(error){
		  //throw Messages.SYSTEM_ERROR
		  //TODO show error on potential sliding frame from top
		}
	}
 }

function setNewNotifications(notifications){
  return {
    type: ActionsTypes.SET_NEW_NOTIFICATIONS,
    notifications,
  }
}