import { combineReducers } from 'redux'
import * as notificationsReducer from './notifications'
import * as routinesReducer from './routines'
import * as timetableReducer from './timetable'
import nav from './navigation'
import * as memberReducer from './member' 

export default combineReducers(Object.assign(
  notificationsReducer, 
  routinesReducer, 
  timetableReducer, 
  {nav:navReducer},
  memberReducer
))