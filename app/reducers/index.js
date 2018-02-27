import { combineReducers } from 'redux'
import * as notificationsReducer from './notifications'

export default combineReducers(Object.assign(
  notificationsReducer
))