import createReducer from './lib/createReducer'
import { ActionsTypes, ServerProtocol } from '/config/settings'

export const userData = createReducer({}, {
  [ActionsTypes.SET_USER_DATA](state, action) {
    return action.userData
  },
  [ActionsTypes.SET_NEW_MEMBER_DATA](state, action) {
    return action.userData
  }
})