import { AsyncStorage } from 'react-native'
import { Keys, Messages } from '../config/settings'
import { observable, action } from "mobx"

export default class NotificationsStore {

  //@observable static notificationsArray = [];
  @observable marianoSurname = "";

  //@action static updateNotificationsArray(newNotification) {
  //  this.notificationsArray = [newNotification, ...this.notificationsArray]
  //};

  /*@action changeSurname() {
    this.marianoSurname = "ksairi"
  };*/

  async saveNotifications(newNotification){

    try{
      if(newNotification[Keys.timeTable]){
        await AsyncStorage.setItem(Keys.timeTable, JSON.stringify(newNotification[Keys.timeTable]))
      }
      else{
        
        var alreadySavedNotification = false      
        this.notificationsArray = await AsyncStorage.getItem(Keys.notifications)
          if(!this.notificationsArray){
            this.notificationsArray = []
          }
          else{
            this.notificationsArray = JSON.parse(this.notificationsArray)
            alreadySavedNotification = this.notificationsArray.filter(
              notification => notification.key == newNotification.key).length > 0
            
            if(!alreadySavedNotification){
              if(newNotification.unRead == null){
                newNotification.unRead = true    
              }
              //notificationsArray = [newNotification, ...notificationsArray]
              //this.updateNotificationsArray(newNotification)
              //this.changeSurname()
              this.marianoSurname = "ksairi"
              console.log(this.marianoSurname)
              await AsyncStorage.setItem(Keys.notifications, JSON.stringify(this.notificationsArray))
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