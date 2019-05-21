import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const userData = createReducer(
  {},
  {
    [ActionsTypes.SET_USER_DATA] (state, action) {
      return action.userData
    },
    [ActionsTypes.SET_NEW_PASSWORD] (state, action) {
      return { ...state, password: action.password }
    }
  }
)

export const newMemberData = createReducer(null, {
  [ActionsTypes.SET_NEW_MEMBER_DATA] (state, action) {
    if (action.newMemberData != null) {
      const newMemberData = {
        ...action.newMemberData,
        freeEntryData: {
          ...action.newMemberData.freeEntryData,
          date: Date.now()
        }
      }
      return newMemberData
    }
    return state
  }
})

export const profilePicture = createReducer(null, {
  [ActionsTypes.SET_PROFILE_PICTURE] (state, action) {
    return action.profilePicture
  },
  [ActionsTypes.SET_PROFILE_PICTURE_SYNCHED] (state, action) {
    return { ...state, synched: true }
  }
})

export const receiveNotifications = createReducer(null, {
  [ActionsTypes.SET_RECEIVE_NOTIFICATIONS] (state, action) {
    return action.obj
  },
  [ActionsTypes.SET_RECEIVE_NOTIFICATIONS_SYNCHED] (state, action) {
    return { ...state, synched: true }
  }
})
