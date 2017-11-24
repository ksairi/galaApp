const { Urls, Messages } = require('../config/settings.js')
    , { isDeviceConnected } = require('./NetworkHelper')

function login(userId, password) {

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


function register(fullName, userId, password) {

  const loginParamters = {}
  
  registerParamters.fullName = fullName
  registerParamters.userId = userId
  registerParamters.password = password
  registerParamters.accessHash = getAccessHash()
  return connectToServer(Urls.REGISTER, registerParamters)
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
        throw new Error(Messages.SERVER_ERROR)
      }
    }
    else{
        throw new Error(Messages.SERVER_ERROR)
    }
  })
  .then((responseJson) => {
    if(responseJson.error)
      throw new Error(responseJson.error)
    else{
      return responseJson
    }
  })
  .catch((error) =>{
    return (
      isDeviceConnected()
      .then((isConnected)=>{
        if(isConnected){
          throw new Error(error.message)
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


module.exports = {

  login,
  register
}