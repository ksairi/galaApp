import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const userData = createReducer({}, {
  [ActionsTypes.SET_USER_DATA](state, action) {
    return action.userData
  },
})

export const notificationsToken = createReducer(null, {
  [ActionsTypes.SET_NOTIFICATIONS_TOKEN](state, action) {
    return action.notificationsToken
  },
})