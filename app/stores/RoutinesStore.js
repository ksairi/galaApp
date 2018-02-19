import { AsyncStorage } from 'react-native'
import { Keys, Messages } from '../config/settings'
import { observable, action } from "mobx"

export default class RoutinesStore {

  @observable static routinesArray = [];
  
  @action static updateRoutinesArray(newRoutines) {
    RoutinesStore.routinesArray = [newRoutines, ...RoutinesStore.routinesArray]
  }

  static async saveRoutines(newRoutines){

    try{
        var alreadySavedNotification = false      
        RoutinesStore.updateRoutinesArray = await AsyncStorage.getItem(Keys.routines)
        if(!RoutinesStore.updateRoutinesArray){
          RoutinesStore.updateRoutinesArray = []
        }
        else{
            RoutinesStore.updateRoutinesArray = JSON.parse(RoutinesStore.updateRoutinesArray)
            alreadySavedNotification = RoutinesStore.updateRoutinesArray.filter(
              notification => notification.key == newNotification.key).length > 0
            
            if(!alreadySavedNotification){
              if(newNotification.unRead == null){
                newNotification.unRead = true    
              }
              RoutinesStore.updateNotificationsArray(newNotification)              
              await AsyncStorage.setItem(Keys.routines, JSON.stringify(RoutinesStore.updateRoutinesArray))
            }
          }
      
    }catch(error){
      console.log(error)
      //throw Messages.SYSTEM_ERROR
      //TODO show error on potential sliding frame from top
    }
  }
}