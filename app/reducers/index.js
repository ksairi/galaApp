import { combineReducers } from 'redux'
import * as notificationsReducer from './notifications'
import * as routinesReducer from './routines'
import * as timetableReducer from './timetable'

export default combineReducers(Object.assign(
  notificationsReducer,
  routinesReducer,
  timetableReducer
))