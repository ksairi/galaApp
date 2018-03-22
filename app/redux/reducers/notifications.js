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

  [ActionsTypes.SET_READ_NOTIFICATION](state, action){
    return Object.assign([...state], {[action.index]:Object.assign({}, state[action.index], {unRead:false})})
  },

  [ActionsTypes.SET_NOTIFICATIONS_SYNC_FLAGS](state, action){
    
    var notifications = [...state]
    action.receivedNotificationsKeys.forEach(key =>{
      const index = notifications.findIndex(notification =>{
        return notification.key == key
      })
      if(index >= 0){
        notifications = Object.assign(
       [...notifications], 
       {[index]:
         Object.assign({}, notifications[index], {receivedFlagSynched : true})})
      }
    })

    action.readNotificationsKeys.forEach(key =>{
      const index = notifications.findIndex(notification =>{
        return notification.key == key
      })
      if(index >= 0){          
        notifications = Object.assign(
        [...notifications], 
        {[index]:
         Object.assign({}, notifications[index], {unReadFlagSynched : true})})
      }
    })

    return notifications
  } 
})

export const notificationsToken = createReducer(null, {
  [ActionsTypes.SET_NOTIFICATIONS_TOKEN](state, action) {
    return action.notificationsToken
  },
})