import { ActionsTypes } from '/config/settings'

export function setCurrentHomeDrawerOption (currentHomeDrawerOption){
  return (dispatch, getState) => {
    dispatch({type: ActionsTypes.SET_CURRENT_HOME_DRAWER_OPTION, currentHomeDrawerOption})
  }
 }