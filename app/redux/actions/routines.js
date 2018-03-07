import { AsyncStorage } from 'react-native'
import { ActionsTypes, Keys } from '/config/settings'

export function saveRoutines(newRoutines){
	return async (dispatch, getState) => {
		try{
		    var routinesArray = await AsyncStorage.getItem(Keys.routines)
		    if(!routinesArray){
		      routinesArray = []
		    }
		    else{
		        routinesArray = JSON.parse(routinesArray)
		    }

		    var newRoutinesToApply = []	
	        newRoutines.forEach(newRoutine =>{
	        	const found = routinesArray.find(routine=> routine.key == newRoutine.key)
	        	if(!found){
	        		newRoutinesToApply = [newRoutine, ...newRoutinesToApply]
	        	}
	        })
	        if(newRoutinesToApply.length > 0){
	        	
	        	routinesArray = [...newRoutinesToApply ,...routinesArray]  
          		await AsyncStorage.setItem(Keys.routines, JSON.stringify(routinesArray))
          		dispatch(setNewRoutines(routinesArray))
          	}
	        
		    
		  
		}catch(error){
		  //throw Messages.SYSTEM_ERROR
		  //TODO show error on potential sliding frame from top
		}
	}
 }

function setNewRoutines(routines){
  return {
    type: ActionsTypes.SET_NEW_ROUTINES,
    routines,
  }
}