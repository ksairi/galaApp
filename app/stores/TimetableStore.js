import { AsyncStorage } from 'react-native'
import { Keys, Messages } from '../config/settings'
import { observable, action } from "mobx"

export default class TimetableStore {

  @observable static timeTableData = null;
  
  @action static updateNotificationsArray(timeTableData) {
    TimetableStore.timeTableData = timeTableData
  }

  static async saveTimetable(timetableData){

    try{
        
        await AsyncStorage.setItem(Keys.timetable, JSON.stringify(timetableData))
      	TimetableStore.updateTimetableData = timetableData
    }catch(error){
      console.log(error)
      //throw Messages.SYSTEM_ERROR
      //TODO show error on potential sliding frame from top
    }
  }
}