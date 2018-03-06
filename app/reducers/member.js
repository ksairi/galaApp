import createReducer from './lib/createReducer'
import { ActionsTypes } from '../config/settings'

export const isNewMember = createReducer({}, {
  [ActionsTypes.SET_IS_NEW_MEMBER](state, action) {
    return action.isNewMember
  },
})