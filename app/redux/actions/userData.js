import { ActionsTypes, ServerProtocol } from '/config/settings'


export function setUserData (userData){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_USER_DATA, userData})
  }
}

export function setNewMemberData (newMemberData){
  return (dispatch, getState) => {
    var userData = {...getState().userData, [ServerProtocol.newMember]: { ...getState().userData[ServerProtocol.newMember], freeEntryDaysLeft:newMemberData[ServerProtocol.freeEntryDaysLeft] }}
    dispatch({type:ActionsTypes.SET_NEW_MEMBER_DATA, userData})
  }
}