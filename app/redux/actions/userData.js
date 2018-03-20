import { ActionsTypes, ServerProtocol } from '/config/settings'


export function setUserData(userData){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_USER_DATA, userData})
  }
}

export function setNewMemberData(newMemberData){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_NEW_MEMBER_DATA, newMemberData})
  }
}

export function setIsUsingCache(isUsingCache) {
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_IS_USING_CACHE, isUsingCache})
  }
}