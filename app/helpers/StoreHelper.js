import { ActionsCreators } from '/redux/actions'
import { Messages } from '/config/settings'
import * as FileSystem from 'expo-file-system'

exports.setInitialData = (loginServerData, userId, password, dispatch) => {
  const { userData, newMemberData, routines } = loginServerData
  userData.userId = userId
  userData.password = password

  dispatch(ActionsCreators.logIn())
  if (userData) {
    const userDataCopy = { ...userData }
    delete userDataCopy.receivePushNotifications

    dispatch(ActionsCreators.setUserData(userDataCopy))
    dispatch(
      ActionsCreators.setReceiveNotifications({
        value: userData.receivePushNotifications,
        synched: false
      })
    )
  }
  dispatch(ActionsCreators.setNewMemberData(newMemberData))
  dispatch(ActionsCreators.setRoutines(routines))
}

exports.setContentServerData = async (contentServerData, dispatch) => {
  if (contentServerData) {
    const {
      // loginImages,
      mainMenuImages,
      // classesImages,
      // timetableImages,
      timetable,
      sentMessages,
      messages
    } = contentServerData
    /* await saveDataToDevice(
      loginImages,
      'loginImage',
      ActionsCreators.setLoginImages,
      ActionsCreators.removeLoginImage,
      dispatch
    )*/
    await saveMainMenuImages(mainMenuImages, dispatch)

    /* saveDataToDevice(
        'routinesImage',
        ActionsCreators.setRoutinesImages,
        ActionsCreators.
        dispatch
      )

      saveDataToDevice(
        classesImages,
        'classesImage',
        ActionsCreators.setClassesImages,
        ActionsCreators.
        dispatch
      )

      saveDataToDevice(
        timetableImages,
        'timetableImage',
        ActionsCreators.setTimetableImages,
        ActionsCreators.
        dispatch
      )*/
    saveTimetableToDevice(timetable, dispatch)
    saveMessagesToDevice(messages, sentMessages, dispatch)
  }
}

exports.clearStore = dispatch => {
  dispatch(ActionsCreators.setUserData({}))
  dispatch(ActionsCreators.setNewMemberData({}))
  dispatch(ActionsCreators.setTimetable(null))
  dispatch(ActionsCreators.setRoutines(null))
  dispatch(ActionsCreators.setMessages(null))
}
export const saveDataToDevice = (
  data,
  prefix,
  addAction,
  removeAction,
  dispatch
) => {
  if (data) {
    const newDataPromises = data.map(dataItem => {
      const fileUri =
        FileSystem.documentDirectory +
        prefix +
        (dataItem.imageIndex ? dataItem.imageIndex : dataItem.id) +
        '.' +
        dataItem.imageExt
      if (dataItem.imageUrl) {
        dispatch(ActionsCreators.setIsDownloadingRemoteImages(true))
        return FileSystem.downloadAsync(encodeURI(dataItem.imageUrl), fileUri)
          .then(({ uri }) => {
            return {
              ...dataItem,
              uri
            }
          })
          .catch(() => {
            throw Messages.NO_SPACE_IN_DISK
          })
      } else {
        return FileSystem.deleteAsync(fileUri, { idempotent: false })
          .then(() => {
            return dataItem
          })
          .catch(() => {
          })
      }
    })
    return Promise.all(newDataPromises)
      .then(newDataArray => {
        const dataToAdd = []
        const dataToRemove = []
        const newParameters = { indexesToAdd: [], indexesToRemove: [] }
        newDataArray.forEach(newData => {
          if (newData.uri) {
            dataToAdd.push(newData)
            if (newData.imageIndex) {
              newParameters.indexesToAdd.push(parseInt(newData.imageIndex))
            }
          } else {
            if (newData.imageIndex) {
              dataToRemove.push(newData.imageIndex)
            } else {
              dataToRemove.push(newData.id)
            }
            if (newData.imageIndex) {
              newParameters.indexesToRemove.push(parseInt(newData.imageIndex))
            }
          }
        })
        if (dataToAdd.length > 0) {
          dispatch(addAction(dataToAdd))
          dispatch(ActionsCreators.setIsDownloadingRemoteImages(false))
        }
        if (dataToRemove.length > 0) {
          dispatch(removeAction(dataToRemove))
        }

        return newParameters
      })
      .catch(error => {
        throw error
      })
  }
}

export const saveMainMenuImages = async (mainMenuImages, dispatch) => {
  const updatedIndexes = await saveDataToDevice(
  mainMenuImages,
  'mainMenuImage',
  ActionsCreators.setMainMenuImages,
  ActionsCreators.removeMainMenuImages,
  dispatch
)

  const dataNewState = {}
  dataNewState.entity = 'mainMenuImages'
  dataNewState.data = { updatedIndexes }
  dispatch(ActionsCreators.setLoginSynchedDataParameters(dataNewState))
}

export const saveMessagesToDevice = (messages, sentMessages, dispatch) => {
  if (messages && messages.length > 0) {
    dispatch(ActionsCreators.setMessages(messages))
  }
  if (sentMessages && sentMessages.length > 0) {
    dispatch(ActionsCreators.setSentMessages(sentMessages))
  }

  setMessageLoginSynchedDataParameters(
    messages && messages.length > 0
      ? messages[messages.length - 1].index
      : null,
    sentMessages,
    dispatch
  )
}

export const setMessageLoginSynchedDataParameters = (
  lastMessageIndex,
  sentMessages,
  dispatch
) => {
  var newLastMessageIndex = null
  if (sentMessages && sentMessages.length > 0) {
    newLastMessageIndex = sentMessages[sentMessages.length - 1].index
  } else {
    newLastMessageIndex = lastMessageIndex
  }
  if (newLastMessageIndex != null) {
    dispatch(
      ActionsCreators.setLoginSynchedDataParameters({
        entity: 'messages',
        data: { lastMessageIndex: newLastMessageIndex }
      })
    )
  }
}

const saveTimetableToDevice = (timetable, dispatch) => {
  dispatch(ActionsCreators.setTimetable(timetable))
}
