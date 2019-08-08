import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { ActionsCreators } from '/redux/actions'

exports.getDeviceId = async dispatch => {
  try {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
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
    const deviceId = await Notifications.getExpoPushTokenAsync()
    dispatch(ActionsCreators.setDeviceId(deviceId))
    return deviceId
  } catch (error) {
    // throw Messages.SYSTEM_READ_ERROR
  }
}
