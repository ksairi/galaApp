import { Urls, Messages, ServerProtocol } from '../config/settings.js'
import { isDeviceConnected } from './NetworkHelper'

exports.login = function (userId, password) {

  const loginParamters = {}
  
  loginParamters.userId = userId
  loginParamters.password = password
  loginParamters.hash = getAccessHash()
  return connectToServer(Urls.LOGIN, loginParamters)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return new Promise((resolve, reject)=>{
      reject(error)
      }
    )
  })
}


exports.register = function (fullName, userId, password) {

  const registerParamters = {}
  
  registerParamters.fullName = fullName
  registerParamters.userId = userId
  registerParamters.password = password
  registerParamters.hash = getAccessHash()
  return connectToServer(Urls.REGISTER, registerParamters)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return new Promise((resolve, reject)=>{
      reject(error)
      }
    )
  })
}

exports.resetPassword = function(userId, password){
  const resetPasswordParameters = {}
  resetPasswordParameters.userId = userId
  resetPasswordParameters.password = password
  resetPasswordParameters.hash = getAccessHash()
  return connectToServer(Urls.RESET_PASSWORD, resetPasswordParameters)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return new Promise((resolve, reject)=>{
      reject(error)
    }
  )
})
}

function connectToServer(url, parameters) {
  return fetch(url , {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters)
  })
  .then((response) => {
    if(response.ok){      
      try {
        const jsonObject = JSON.parse(response._bodyText)
        return jsonObject
      }
      catch(e){
        throw Messages.SERVER_ERROR
      }
    }
    else{
        throw Messages.SERVER_ERROR
    }
  })
  .then((responseJson) => {
    if(responseJson[ServerProtocol.statusField] != ServerProtocol.OK){
      throw responseJson.message
    }
    else{
      return responseJson
    }
  })
  .catch((error) =>{
    return (
      isDeviceConnected()
      .then((isConnected)=>{
        if(isConnected){
          if(error.message){ //for unified Error:Network request failed
            throw Messages.SERVER_ERROR
          }
          throw error
        }
        else{
            throw Messages.CHECK_INTERNET_CONNECTION
        }
      })
    )
  })
}

function getAccessHash() {

  return '##GALA2017##'
 // TODO see where we store the hashkey
}