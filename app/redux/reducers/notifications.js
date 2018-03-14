import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const notifications = createReducer([], {
  [ActionsTypes.SET_NOTIFICATIONS](state, action) {
    return action.notifications
  },
  [ActionsTypes.SET_READ_NOTIFICATION](state, action) {
    const notifications = state
    notifications[action.index].unRead = false
    return notifications
  }
})