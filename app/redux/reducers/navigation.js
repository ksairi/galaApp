import { Screens } from '/config/settings'
import { ActionsTypes } from '/config/settings'
import createReducer from './lib/createReducer'

export const currentHomeDrawerOption = createReducer('', {
  [ActionsTypes.SET_CURRENT_HOME_DRAWER_OPTION](state, action){
    return action.currentHomeDrawerOption
  }  
})