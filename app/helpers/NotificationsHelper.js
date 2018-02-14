import { Permissions, Notifications } from 'expo'
import { AsyncStorage } from 'react-native'
import { Keys, Messages } from '../config/settings'
import { observable, action } from "mobx"

export default class NotificationsHelper {
  
  static async getDeviceToken() {

    const savedToken = await AsyncStorage.getItem(Keys.notificationsToken)
    if(savedToken !== null){
      return savedToken
    }

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    var finalStatus = existingStatus

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return null
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync()
    try{
      AsyncStorage.setItem(Keys.notificationsToken, token)
      return token
    }catch(error){
      throw Messages.SYSTEM_ERROR
    }
  }

  @observable static notificationsArray = [];

  @action static updateNotificationsArray(newNotification) {
    NotificationsHelper.notificationsArray = [newNotification, ...NotificationsHelper.notificationsArray]
  };

  static async saveNotifications (newNotification) {

    try{
      if(newNotification[Keys.timeTable]){
        await AsyncStorage.setItem(Keys.timeTable, JSON.stringify(newNotification[Keys.timeTable]))
      }
      else{
        
        var alreadySavedNotification = false      
        NotificationsHelper.notificationsArray = await AsyncStorage.getItem(Keys.notifications)
          if(!NotificationsHelper.notificationsArray){
            NotificationsHelper.notificationsArray = []
          }
          else{
            NotificationsHelper.notificationsArray = JSON.parse(NotificationsHelper.notificationsArray)
            alreadySavedNotification = NotificationsHelper.notificationsArray.filter(
              notification => notification.key == newNotification.key).length > 0
            
            if(!alreadySavedNotification){
              if(newNotification.unRead == null){
                newNotification.unRead = true    
              }
              //notificationsArray = [newNotification, ...notificationsArray]
              NotificationsHelper.updateNotificationsArray(newNotification)
              await AsyncStorage.setItem(Keys.notifications, JSON.stringify(NotificationsHelper.notificationsArray))
            }
          }
      }
    }catch(error){
      console.log(error)
      //throw Messages.SYSTEM_ERROR
      //TODO show error on potential sliding frame from top
    }

  }
}