import { ActionsTypes } from '../config/settings'
import { AsyncStorage } from 'react-native'

exports.saveNotification = (notification)=>{
	return async (dispatch, getState) => {
		try{
		    var alreadySavedNotification = false      
		    var notificationsArray = await AsyncStorage.getItem(Keys.notifications)
		    if(!NotificationsStore.notificationsArray){
		      notificationsArray = []
		    }
		    else{
		        notificationsArray = JSON.parse(notificationsArray)
		        alreadySavedNotification = notificationsArray.filter(
		          notification => notification.key == newNotification.key).length > 0
		        
		        if(!alreadySavedNotification){
		          if(newNotification.unRead == null){
		            newNotification.unRead = true    
		          }
		          notificationsArray = [newNotification, ...NotificationsStore.notificationsArray]              
		          await AsyncStorage.setItem(Keys.notifications, JSON.stringify(notificationsArray))
		          dispatch(setNewNotifications(notificationsArray))
		        }
		      }
		  
		}catch(error){
		  console.log(error)
		  //throw Messages.SYSTEM_ERROR
		  //TODO show error on potential sliding frame from top
		}
	}
 }

exports.setNewNotifications = (notifications)=> {
  return {
    type: ActionsTypes.SET_NEW_NOTIFICATIONS,
    notifications,
  }
}