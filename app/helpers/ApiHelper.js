import { Urls, Messages, ServerProtocol } from '/config/settings.js'
import {isConnected} from 'helpers/NetworkHelper'
import API_ACCESS_TOKEN from '/config/apiAccessToken'

const CONTENT_TYPE_MULTI_PART = 'multipart/form-data'
const CONTENT_TYPE_JSON = 'application/json'

exports.login = (userId, password, deviceId) => {
  const loginParamters = {}

  loginParamters.userId = userId
  loginParamters.password = password
  loginParamters.notificationsToken = deviceId
  return connectToServer(Urls.LOGIN, loginParamters)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.register = (fullName, userId, password, deviceId) => {
  const registerParamters = {}

  registerParamters.fullName = fullName
  registerParamters.userId = userId
  registerParamters.password = password
  registerParamters.notificationsToken = deviceId
  return connectToServer(Urls.REGISTER, registerParamters)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.resetPassword = (userId, password) => {
  const resetPasswordParameters = {}
  resetPasswordParameters.userId = userId
  resetPasswordParameters.password = password
  return connectToServer(Urls.RESET_PASSWORD, resetPasswordParameters)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.sendReferral = (userId, mail) => {
  const sendReferralParameters = {}
  sendReferralParameters.userId = userId
  sendReferralParameters.mail = mail
  return connectToServer(Urls.SEND_REFERRAL, sendReferralParameters)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.syncLocalStorage = (
  userId,
  receivedNotificationsKeys,
  readNotificationsKeys
) => {
  const syncLocalStorageParameters = {}
  syncLocalStorageParameters.userId = userId
  syncLocalStorageParameters.receivedNotificationsKeys = receivedNotificationsKeys
  syncLocalStorageParameters.readNotificationsKeys = readNotificationsKeys
  return connectToServer(Urls.SYN_LOCAL_STORAGE, syncLocalStorageParameters)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.fetchUserData = userId => {
  const fetchUserDataParameters = {}

  fetchUserDataParameters.userId = userId
  return connectToServer(Urls.FETCH_USER_DATA, fetchUserDataParameters)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.fetchDynamicData = params => {
  return connectToServer(
    Urls.FETCH_DYNAMIC_DATA,
    params,
    CONTENT_TYPE_JSON,
    15000
  )
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.setContentSaved = params => {
  return connectToServer(Urls.SET_CONTENT_SAVED, params)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.setNotifiedPromotionsSaved = params => {
  return connectToServer(Urls.SET_NOTIFIED_PROMOTIONS_SAVED, params)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.setNotifiedMessagesSaved = params => {
  return connectToServer(Urls.SET_NOTIFIED_MESSAGES_SAVED, params)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.sendMessages = params => {
  return connectToServer(Urls.SEND_MESSAGES, params)
    .then(response => {
      return response.messages
    })
    .catch(error => {
      throw error
    })
}

exports.getRealTimeMessages = params => {
  return connectToServer(Urls.GET_REAL_TIME_MESSAGES, params)
    .then(response => {
      return response.messages
    })
    .catch(error => {
      throw error
    })
}

exports.getRecordedClasses = () => {
  return connectToServer(Urls.GET_RECORDED_CLASES)
    .then(response => {
      return response.recordings
    })
    .catch(error => {
      throw error
    })
}

exports.setRealTimeMessagesSaved = params => {
  return connectToServer(Urls.SET_REAL_TIME_MESSAGES_SAVED, params)
    .then(response => {
      return response.messages
    })
    .catch(error => {
      throw error
    })
}

exports.uploadProfilePicture = params => {
  return connectToServer(
    Urls.UPLOAD_PROFILE_PICTURE,
    params,
    CONTENT_TYPE_MULTI_PART
  )
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

exports.synchMemberProperties = params => {
  return connectToServer(Urls.SYNCH_MEMBER_PROPERTIES, params)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

const connectToServer = (
  url,
  parameters,
  contentType = CONTENT_TYPE_JSON,
  timeout = 10000
) => {
  return Promise.race([
    timeoutFetch(url, parameters, contentType),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(Messages.SERVER_ERROR), timeout)
    )
  ])
}

let timeoutFetch = (url, parameters = {}, contentType) => {
  const params = contentType === CONTENT_TYPE_JSON ? {...parameters, authorization: API_ACCESS_TOKEN} : parameters
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      authorization: API_ACCESS_TOKEN
    },
    body:
      contentType === CONTENT_TYPE_JSON ? JSON.stringify(params) : params
  })
    .then(response => {
      if (response.ok) {
        try {
          return response.json()
        } catch (e) {
          console.log(e)
          throw Messages.SERVER_ERROR
        }
      } else {
        throw Messages.SERVER_ERROR
      }
    })
    .then(responseJson => {
      if (responseJson[ServerProtocol.statusField] !== ServerProtocol.OK) {
        throw responseJson[ServerProtocol.messageField]
      } else {
        return responseJson
      }
    })
    .catch(async(error) => {
      const isInternetReachable = await isConnected()
      if (isInternetReachable) {
        if (error && error.message) {
          // for unified Error:Network request failed
          throw Messages.SERVER_ERROR
        }
        throw error || Messages.SERVER_ERROR
      } else {
        throw Messages.CHECK_INTERNET_CONNECTION
      }
    })
}
