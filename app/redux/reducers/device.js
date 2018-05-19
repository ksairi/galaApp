import { Dimensions } from 'react-native'
import { ActionsTypes } from '/config/settings'
import createReducer from './lib/createReducer'

const initialOrientation = Dimensions.get('window').height > Dimensions.get('window').width ? 'portrait' : 'landscape'

export const currentOrientation = createReducer(initialOrientation, {
  [ActionsTypes.SET_CURRENT_ORIENTATION](state, action){
    return action.orientation
  }
})

export const headerStyle = createReducer({}, {
  [ActionsTypes.SET_HEADER_STYLE](state, action){
    return action.headerStyle
  }
})
