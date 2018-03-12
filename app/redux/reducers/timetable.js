import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const timetable = createReducer([], {
  [ActionsTypes.SET_TIMETABLE](state, action) {
    return action.timetable
  },

})