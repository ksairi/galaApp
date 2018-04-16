import { ActionsTypes } from '/config/settings'

export function logIn(){
  return (dispatch, getState) => {
   dispatch({type: ActionsTypes.LOG_IN})
  }
}

export function logOut(){
  return (dispatch, getState) => {
   dispatch({type: ActionsTypes.LOG_OUT})
  }
}