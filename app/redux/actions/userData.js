import { ActionsTypes, ServerProtocol } from '/config/settings'


export function setUserData (userData){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_USER_DATA, userData})
  }
}

//http://www.curbitssoftware.com/2017/08/25/react-redux-immutable-update-cheat-sheet/
export function setNewMemberData (newMemberData){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_NEW_MEMBER_DATA, newMemberData})
  }
}