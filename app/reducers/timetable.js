import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const newTimetable = createReducer({}, {
  [ActionsTypes.SET_NEW_TIMETABLE](state, action) {
    return action.timetable
  },

})