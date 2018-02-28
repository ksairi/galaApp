import { ActionsTypes, Keys } from '../config/settings'
import { AsyncStorage } from 'react-native'

export function saveTimetable(newTimetable){
	return async (dispatch, getState) => {
		try{
			await AsyncStorage.setItem(Keys.timetable, JSON.stringify(newTimetable))
          	dispatch(setNewTimetable(newTimetable))
		}catch(error){
		  //throw Messages.SYSTEM_ERROR
		  //TODO show error on potential sliding frame from top
		}
	}
}

export function setNewTimetable(timetable){
	return {
    type: ActionsTypes.SET_NEW_TIMETABLE,
    timetable,
  }
}   