import createReducer from './lib/createReducer'
import { ActionsTypes } from '../config/settings'

export const newNotifications = createReducer({}, {
  [ActionsTypes.SET_NEW_NOTIFICATIONS](state, action) {
    var newState = {}
    action.notifications.forEach( (notification) => {
      newState[notification.key] = notification
    })
    return newState
  },

});