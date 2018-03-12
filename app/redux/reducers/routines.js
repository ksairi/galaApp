import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const routines = createReducer([], {
  [ActionsTypes.SET_ROUTINES](state, action) {
    return action.routines
  },

})