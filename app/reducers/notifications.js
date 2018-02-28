import createReducer from './lib/createReducer'
import { ActionsTypes } from '../config/settings'

export const newNotifications = createReducer({}, {
  [ActionsTypes.SET_NEW_NOTIFICATIONS](state, action) {
    return action.notifications
  },

});