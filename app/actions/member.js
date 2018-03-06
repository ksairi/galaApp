import { ActionsTypes } from '../config/settings'


export function setIsNewMember (isNewMember){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_IS_NEW_MEMBER, isNewMember})
  }
}
