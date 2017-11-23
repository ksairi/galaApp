const { Urls, Messages } = require('../config/settings.js')
    , { isDeviceConnected } = require('./NetworkHelper')

function login(userId, password, cb) {

  const loginParamters = {}
  
  loginParamters.userId = userId
  loginParamters.password = password
  loginParamters.accessHash = getAccessHash()
  connectToServer(Urls.LOGIN, loginParamters, function(error,  data){
    return cb(error, data)
  })
}


function register(fullName, userId, password, cb) {

  const loginParamters = {}
  
  loginParamters.fullName = fullName
  loginParamters.userId = userId
  loginParamters.password = password
  loginParamters.accessHash = getAccessHash()
  connectToServer(Urls.REGISTER, loginParamters, function(error,  data){
    return cb(error, data)
  })
}

function connectToServer(url, parameters, cb) {
  fetch(url , {
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
      return cb(responseJson.error)
    else{
      return cb(null, responseJson)
    }
  })
  .catch((error) =>{
    isDeviceConnected((isConnected) => {
      if(isConnected){
        cb(error.message)
      }
      else{
          cb(Messages.CHECK_INTERNET_CONNECTION)
      }
    })
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