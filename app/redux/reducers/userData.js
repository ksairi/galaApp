import createReducer from './lib/createReducer'
import { ActionsTypes, ServerProtocol } from '/config/settings'

export const userData = createReducer({}, {
  [ActionsTypes.SET_USER_DATA](state, action) {
    return action[ServerProtocol.userData]
  },
  [ActionsTypes.SET_NEW_PASSWORD](state, action){
    return { ...state, password:action.password }
  }
})

export const newMemberData = createReducer({}, {
  [ActionsTypes.SET_NEW_MEMBER_DATA](state, action){
    if(action[ServerProtocol.newMemberData]){
      return action[ServerProtocol.newMemberData]
    }
    else{
      return state
    }    
  },
  [ActionsTypes.SET_NOTIFICATIONS_NEW_MEMBER_DATA](state, action){
    if(action[ServerProtocol.notificationsNewMemberData]){
      return {...state, [ServerProtocol.freeEntryDaysLeft]: action[ServerProtocol.notificationsNewMemberData][ServerProtocol.freeEntryDaysLeft]}
    }
    else{
      return state
    }
  }  
})

export const isUsingCache = createReducer(false, {
  [ActionsTypes.SET_IS_USING_CACHE](state, action) {
    return action.isUsingCache
  }
})