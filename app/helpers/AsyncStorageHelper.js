import { AsyncStorage } from 'react-native'
import { Messages, Labels, Keys } from '../config/settings'

exports.saveInitialData = (serverData, userId) => {
  const userData = serverData[Keys.userData]
  userData.userId = userId
  return( 
    AsyncStorage.multiSet([
      [Keys.userData, JSON.stringify(serverData[Keys.userData])],
      [Keys.timeTable, JSON.stringify(serverData[Keys.timeTable])],
      [Keys.routines, JSON.stringify(serverData[Keys.routines])],
      [Keys.notifications, JSON.stringify(serverData[Keys.notifications])],
    ])
    .catch(()=>{
      throw Messages.SYSTEM_ERROR
    })
  )
}