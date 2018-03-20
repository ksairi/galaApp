import { ServerProtocol } from '/config/settings'
import { ActionsCreators } from '/redux/actions'

exports.setInitialData = (serverData, userId, password, dispatch) => {
  const userData = serverData[ServerProtocol.userData]
  userData.userId = userId
  userData.password = password
  dispatch(ActionsCreators.setUserData(userData))
  dispatch(ActionsCreators.setIsUsingCache(false))
  dispatch(ActionsCreators.setTimetable(serverData[ServerProtocol.timetable]))
  dispatch(ActionsCreators.setRoutines(serverData[ServerProtocol.routines]))
  dispatch(ActionsCreators.setNotifications(serverData[ServerProtocol.notifications]))  
}

exports.clearStore = (dispatch) => {
  dispatch(ActionsCreators.setUserData({}))
  dispatch(ActionsCreators.setTimetable(null))
  dispatch(ActionsCreators.setRoutines(null))
  dispatch(ActionsCreators.setNotifications(null))  
}