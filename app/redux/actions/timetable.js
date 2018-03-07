import { AsyncStorage } from 'react-native'
import { ActionsTypes, Keys } from '/config/settings'

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

function setNewTimetable(timetable){
	return {
    type: ActionsTypes.SET_NEW_TIMETABLE,
    timetable,
  }
}   