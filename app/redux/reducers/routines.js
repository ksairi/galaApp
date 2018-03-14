import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const routines = createReducer([], {
  [ActionsTypes.SET_ROUTINES](prevRoutines, action) {
    if(action.routines == null){
      return []
    }
    var routines = [...prevRoutines]
    var newRoutinesToApply = [] 
      action.routines.forEach(newRoutine =>{
        const found = routines.find(routine=> routine.key == newRoutine.key)
        if(!found){
          newRoutinesToApply = [newRoutine, ...newRoutinesToApply]
        }
      })
      if(newRoutinesToApply.length > 0){
        routines = [...newRoutinesToApply ,...routines]  
      }
      return routines
  },

})