import { Screens } from '/config/settings'
import AppNavigator from '/navigation'
import { ActionsTypes } from '/config/settings'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(Screens.LoginStack))

export const nav = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export const currentHomeDrawerOption = (state = '', action)=> {
  if(action.type == ActionsTypes.SET_CURRENT_HOME_DRAWER_OPTION){
    return action.currentHomeDrawerOption
  }
  else {
    return state
  }
}