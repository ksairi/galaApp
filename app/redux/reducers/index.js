import { combineReducers } from 'redux'
import createSecureStore from "redux-persist-expo-securestore"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { persistReducer } from 'redux-persist'
import * as notificationsReducer from './notifications'
import * as routinesReducer from './routines'
import * as timetableReducer from './timetable'
import * as userDataReducer from './userData'
import * as sessionReducer from './session'
import * as navigationReducer  from './navigation'


const rootPresistConfig = {
  key: 'root',
  storage : createSecureStore(),
  stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers(Object.assign(
  notificationsReducer, 
  routinesReducer, 
  timetableReducer,   
  userDataReducer,
  sessionReducer,
  navigationReducer
))

export default persistReducer(rootPresistConfig, rootReducer)