import { AsyncStorage } from 'react-native'
import { ActionsTypes, Keys } from '/config/settings'

export function setTimetable(timetable){
	return async (dispatch, getState) => {
		try{
			await AsyncStorage.setItem(Keys.timetable, JSON.stringify(newTimetable))
          	dispatch({type: ActionsTypes.SET_NEW_TIMETABLE, timetable})
		}catch(error){
		  //throw Messages.SYSTEM_ERROR
		  //TODO show error on potential sliding frame from top
		}
	}
}