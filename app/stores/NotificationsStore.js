import { AsyncStorage } from 'react-native'
import { Keys, Messages } from '../config/settings'
import { observable, action } from "mobx"

export default class NotificationsStore {

  @observable static notificationsArray = [];
  
  @action static updateNotificationsArray(newNotification) {
    NotificationsStore.notificationsArray = [newNotification, ...NotificationsStore.notificationsArray]
  }

  static async saveNotifications(newNotification){

    try{
        var alreadySavedNotification = false      
        NotificationsStore.notificationsArray = await AsyncStorage.getItem(Keys.notifications)
        if(!NotificationsStore.notificationsArray){
          NotificationsStore.notificationsArray = []
        }
        else{
            NotificationsStore.notificationsArray = JSON.parse(NotificationsStore.notificationsArray)
            alreadySavedNotification = NotificationsStore.notificationsArray.filter(
              notification => notification.key == newNotification.key).length > 0
            
            if(!alreadySavedNotification){
              if(newNotification.unRead == null){
                newNotification.unRead = true    
              }
              NotificationsStore.updateNotificationsArray(newNotification)              
              await AsyncStorage.setItem(Keys.notifications, JSON.stringify(NotificationsStore.notificationsArray))
            }
          }
      
    }catch(error){
      console.log(error)
      //throw Messages.SYSTEM_ERROR
      //TODO show error on potential sliding frame from top
    }
  }
}