import { ActionsTypes } from '/config/settings'

export function setCurrentOrientation (orientation){
  return (dispatch, getState) => {
    dispatch({type: ActionsTypes.SET_CURRENT_ORIENTATION, orientation})
  }
 }

 export function setHeaderStyle (headerStyle){
   return (dispatch, getState) => {
     dispatch({type: ActionsTypes.SET_HEADER_STYLE, headerStyle})
   }
  }
