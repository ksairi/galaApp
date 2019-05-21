import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const timetable = createReducer([], {
  [ActionsTypes.SET_TIMETABLE] (state, action) {
    if (action.timetable == null) {
      return []
    }
    return action.timetable
  }

})
