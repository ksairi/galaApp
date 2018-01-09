import { AsyncStorage } from 'react-native'
import { Messages, Labels, Keys } from '../config/settings'

exports.saveInitialData = (serverData, userId) => {
  return( 
    AsyncStorage.multiSet([
      [Keys.userData, JSON.stringify(serverData.user)],
      [Keys.timeTable, JSON.stringify(serverData.timeTable)],
      [Keys.userId, userId]
    ])
    .catch(()=>{
      throw Messages.SYSTEM_ERROR
    })
  )
}