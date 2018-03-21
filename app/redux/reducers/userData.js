import createReducer from './lib/createReducer'
import { ActionsTypes, ServerProtocol } from '/config/settings'

export const userData = createReducer({}, {
  [ActionsTypes.SET_USER_DATA](state, action) {
    return action[ServerProtocol.userData]
  },
  //http://www.curbitssoftware.com/2017/08/25/react-redux-immutable-update-cheat-sheet/
  [ActionsTypes.SET_NEW_MEMBER_DATA](state, action){
    var userData = {...state, [ServerProtocol.newMember]: { ...state[ServerProtocol.newMember]
      , [ServerProtocol.freeEntryDaysLeft]: action.newMemberData[ServerProtocol.freeEntryDaysLeft]}
    }
    return userData
  },
  [ActionsTypes.SET_NEW_PASSWORD](state, action){
    return { ...state, password:action.password }

  }
})

export const isUsingCache = createReducer(false, {
  [ActionsTypes.SET_IS_USING_CACHE](state, action) {
    return action.isUsingCache
  }
})