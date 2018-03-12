import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const notifications = createReducer([], {
  [ActionsTypes.SET_NOTIFICATIONS](state, action) {
    return action.notifications
  },

})