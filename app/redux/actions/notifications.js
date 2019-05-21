import { ActionsTypes } from '/config/settings'

export function setIsDownloadingRemoteImages (isDownloadingRemoteImages) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionsTypes.SET_IS_DOWNLOADING_REMOTE_IMAGES,
      isDownloadingRemoteImages
    })
  }
}

export function setNotificationsText (notificationsText) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionsTypes.SET_NOTIFICATIONS_TEXT,
      notificationsText
    })
  }
}
