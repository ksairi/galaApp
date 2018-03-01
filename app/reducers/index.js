import { combineReducers } from 'redux'
import * as notificationsReducer from './notifications'
import * as routinesReducer from './routines'
import * as timetableReducer from './timetable'
import navReducer from './navigation'

export default combineReducers(Object.assign(
  notificationsReducer, 
  routinesReducer, 
  timetableReducer, 
  {nav:navReducer}
))