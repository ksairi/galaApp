import { ActionsTypes } from '/config/settings'

export function setRoutines(newRoutines){
	return (dispatch, getState) => {
		if(newRoutines == null){
			dispatch({type: ActionsTypes.SET_ROUTINES, routines:[]})
			return
		}
	  var routines = getState().routines
	  var newRoutinesToApply = []	
	    newRoutines.forEach(newRoutine =>{
	    	const found = routines.find(routine=> routine.key == newRoutine.key)
	    	if(!found){
	    		newRoutinesToApply = [newRoutine, ...newRoutinesToApply]
	    	}
	    })
	    if(newRoutinesToApply.length > 0){
	    	routines = [...newRoutinesToApply ,...routines]  
	    }
	    dispatch({type: ActionsTypes.SET_ROUTINES, routines})
	}
 }