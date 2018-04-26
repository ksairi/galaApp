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

export function setIsAppsFirstTime(state){
  return (dispatch, getState) => {
   dispatch({type: ActionsTypes.SET_IS_APPS_FIRST_TIME, state})
  }
}
export function setAutoLoginErrorMessage(autoLoginErrorMessage){
 return(dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_AUTO_LOGIN_ERROR_MESSAGE, autoLoginErrorMessage})
  } 
}