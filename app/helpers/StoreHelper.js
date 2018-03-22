import { ServerProtocol } from '/config/settings'
import { ActionsCreators } from '/redux/actions'
import { syncLocalStorage } from '/helpers/ApiHelper'


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

exports.syncStoreWithServer = (userId, notifications, dispatch) => {
  var readNotificationsKeys = []
    , receivedNotificationsKeys = []

  notifications.forEach(notification => {
    
    if(!notification.receivedFlagSynched){
      receivedNotificationsKeys.push(notification.key)
    }

    if(!notification.unRead && !notification.unReadFlagSynched){
      readNotificationsKeys.push(notification.key) 
    }
  })
  if(receivedNotificationsKeys.length > 0 || readNotificationsKeys.length > 0){
    syncLocalStorage(userId, receivedNotificationsKeys, readNotificationsKeys)
    .then(response =>{
      if(response[ServerProtocol.statusField] == ServerProtocol.OK)
      dispatch(ActionsCreators.setNotificationsSyncFlags(receivedNotificationsKeys, readNotificationsKeys))
    })
    .catch(error=>{

    })
  }
}