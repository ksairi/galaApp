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
        var alreadySavedRoutine = false      
        RoutinesStore.updateRoutinesArray = await AsyncStorage.getItem(Keys.routines)
        if(!RoutinesStore.updateRoutinesArray){
          RoutinesStore.updateRoutinesArray = []
        }
        else{
            RoutinesStore.updateRoutinesArray = JSON.parse(RoutinesStore.updateRoutinesArray)
            alreadySavedRoutine = RoutinesStore.updateRoutinesArray.filter(
              routine => routine.key == routine.key).length > 0
            
            if(!alreadySavedRoutine){
              RoutinesStore.updateRoutinesArray(newRoutines)              
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