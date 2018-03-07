import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const newRoutines = createReducer({}, {
  [ActionsTypes.SET_NEW_ROUTINES](state, action) {
    return action.routines
  },

})