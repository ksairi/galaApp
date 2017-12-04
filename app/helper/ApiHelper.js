import { Urls, Messages } from '../config/settings.js'
import { isDeviceConnected } from './NetworkHelper'

exports.login = function (userId, password) {

  const loginParamters = {}
  
  loginParamters.userId = userId
  loginParamters.password = password
  loginParamters.accessHash = getAccessHash()
  return connectToServer(Urls.LOGIN, loginParamters)
  .then((response) => {
    return response
  })
  .catch((error) => {
    throw new Error(error.message)
  })
}


exports.register = function (fullName, userId, password) {

  const registerParamters = {}
  
  registerParamters.fullName = fullName
  registerParamters.userId = userId
  registerParamters.password = password
  registerParamters.accessHash = getAccessHash()
  return connectToServer(Urls.REGISTER, registerParamters)
  .then((response) => {
    return response
  })
  .catch((error) => {
    throw new Error(error.message)
  })
}

exports.resetPassword = function(mail){
  const resetPasswordParameters = {}
  resetPasswordParameters.mail = mail
  resetPasswordParameters.accessHash = getAccessHash()
  return connectToServer(Urls.RESET_PASSWORD, resetPasswordParameters)
  .then((response) => {
    return response
  })
  .catch((error) => {
    throw new Error(error.message) 
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
        const jsonObject = JSON.parse(response)
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
    if(responseJson.error)
      throw responseJson.error
    else{
      return responseJson
    }
  })
  .catch((error) =>{
    return (
      isDeviceConnected()
      .then((isConnected)=>{
        if(isConnected){
          throw new Error(error)
        }
        else{
            throw new Error(Messages.CHECK_INTERNET_CONNECTION)
        }
      })
    )
  })
}

function getAccessHash () {

  return ''
 // TODO see where we store the hashkey
}