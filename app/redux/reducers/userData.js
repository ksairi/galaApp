import createReducer from './lib/createReducer'
import { ActionsTypes, ServerProtocol } from '/config/settings'

export const userData = createReducer({}, {
  [ActionsTypes.SET_USER_DATA](state, action) {
    return action[ServerProtocol.userData]
  },
  [ActionsTypes.SET_NEW_MEMBER_DATA](state, action) {
    var userData = {...state, [ServerProtocol.newMember]: { ...state[ServerProtocol.newMember]
      , [ServerProtocol.freeEntryDaysLeft]: action.newMemberData[ServerProtocol.freeEntryDaysLeft]}
    }
    return userData
  }
})