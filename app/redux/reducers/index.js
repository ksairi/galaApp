import { combineReducers } from 'redux'
import createSecureStore from "redux-persist-expo-securestore"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { persistReducer } from 'redux-persist'
import * as notificationsReducer from './notifications'
import * as routinesReducer from './routines'
import * as timetableReducer from './timetable'
import * as userDataReducer from './userData'
import * as SessionReducer from './session'
import nav from './navigation'


const rootPresistConfig = {
  key: 'root',
  storage : createSecureStore(),
  stateReconciler: autoMergeLevel2,
  blacklist:['nav']
}

const rootReducer = combineReducers(Object.assign(
  notificationsReducer, 
  routinesReducer, 
  timetableReducer,   
  userDataReducer,
  SessionReducer,
  {nav},
))

export default persistReducer(rootPresistConfig, rootReducer)