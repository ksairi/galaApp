import * as notificationsReducer from './notifications'
import * as routinesReducer from './routines'
import * as timetableReducer from './timetable'
import * as userDataReducer from './userData' 
import nav from './navigation'

export default Object.assign(
  notificationsReducer, 
  routinesReducer, 
  timetableReducer,   
  userDataReducer,
  {nav},
)