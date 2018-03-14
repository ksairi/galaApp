import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const notifications = createReducer([], {
  [ActionsTypes.SET_NOTIFICATIONS](prevNotifications, action) {
    
    if(action.notifications == null){
      return []
    }
    var notifications = prevNotifications
    var newNotificationsToApply = []
    action.notifications.forEach(newNotification =>{
      const found = notifications.find(notification=> notification.key == newNotification.key)
      if(!found){
        if(newNotification.unRead == null){
            newNotification.unRead = true    
          }
        newNotificationsToApply = [newNotification, ...newNotificationsToApply]
      }
    })
    notifications = [...newNotificationsToApply, ...notifications]
    return notifications
  },

  [ActionsTypes.SET_READ_NOTIFICATION](state, action) {
    const notifications = state
    notifications[action.index].unRead = false
    return notifications
  }
})

export const notificationsToken = createReducer(null, {
  [ActionsTypes.SET_NOTIFICATIONS_TOKEN](state, action) {
    return action.notificationsToken
  },
})