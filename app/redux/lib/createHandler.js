import { Notifications } from '/config/settings'
export default handlers => {
  return function notificationHandler (data) {
    const hanlder = Object.keys(data).filter(
      key => key !== Notifications.idFieldName
    )
    if (handlers.hasOwnProperty(hanlder)) {
      return handlers[hanlder](data)
    } else {
      return null
    }
  }
}
