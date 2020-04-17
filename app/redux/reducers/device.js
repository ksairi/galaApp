import { Dimensions } from 'react-native'
import { ActionsTypes } from '/config/settings'
import createReducer from './lib/createReducer'

const initialOrientation =
  Dimensions.get('window').height > Dimensions.get('window').width
    ? 'portrait'
    : 'landscape'

export const currentOrientation = createReducer(initialOrientation, {
  [ActionsTypes.SET_CURRENT_ORIENTATION] (state, action) {
    return action.orientation
  }
})

export const deviceId = createReducer(null, {
  [ActionsTypes.SET_DEVICE_ID] (state, action) {
    return action.deviceId
  }
})
export const statusBarIsHidden = createReducer(false, {
  [ActionsTypes.SET_HIDDEN_STATUS_BAR] (state, action) {
    return action.value
  }
})
