import { Permissions, Notifications } from 'expo'
import { AsyncStorage } from 'react-native'
import { Keys, Messages } from '../config/settings'

exports.getDeviceToken = async ()=> {

  const savedToken = await AsyncStorage.getItem(Keys.notificationsToken)
  if(savedToken !== null){
    return savedToken
  }

  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  var finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return null
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync()
  try{
    AsyncStorage.setItem(Keys.notificationsToken, token)
    return token
  }catch(error){
    throw Messages.SYSTEM_ERROR
  }
}

exports.saveNotifications = async (notification) => {
  try{
    if(notification.data[Keys.timeTable]){
      await AsyncStorage.setItem(Keys.timeTable, JSON.stringify(notification[Keys.timeTable]))
    }
    else{
      
      var notificationsArray = await AsyncStorage.getItem(Keys.notifications)
        if(!notificationsArray){
          notificationsArray = []
        }
        else{
          notificationsArray = JSON.parse(notificationsArray)
        }

        const notificationObj = {}
        notificationObj.key = notification.data.key
        notificationObj.title = notification.data.title
        notificationObj.body = notification.data.body
        notificationObj.unRead = notification.unRead
              
        notificationsArray = [notificationObj, ...notificationsArray]
        
        await AsyncStorage.setItem(Keys.notifications, JSON.stringify(notificationsArray))
    }
  }catch(error){
    //throw Messages.SYSTEM_ERROR
    //TODO show error on potential sliding frame from top
  }

}