import { combineReducers } from 'redux'
import * as notificationsReducer from './notifications'
import * as routinesReducer from './routines'
import * as timetableReducer from './timetable'
import * as memberReducer from './member' 
import nav from './navigation'

export default combineReducers(Object.assign(
  notificationsReducer, 
  routinesReducer, 
  timetableReducer,   
  memberReducer,
  {nav},
))