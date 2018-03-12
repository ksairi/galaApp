import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const userData = createReducer({}, {
  [ActionsTypes.SET_USER_DATA](state, action) {
    return action.userData
  },
})

export const notificationToken = createReducer({}, {
  [ActionsTypes.SET_NOTIFICATION_TOKEN](state, action) {
    return action.notificationToken
  },
})