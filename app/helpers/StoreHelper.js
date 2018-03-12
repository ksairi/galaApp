import { Keys } from '/config/settings'
import { ActionsCreators } from '/redux/actions'

exports.setInitialData = (serverData, userId, dispatch) => {
  const userData = serverData[Keys.userData]
  userData.userId = userId
  dispatch(ActionsCreators.setUserData(serverData[Keys.userData]))
  dispatch(ActionsCreators.setTimetable(serverData[Keys.timetable]))
  dispatch(ActionsCreators.setRoutines(serverData[Keys.routines]))
  dispatch(ActionsCreators.setNotifications(serverData[Keys.notifications]))  
}