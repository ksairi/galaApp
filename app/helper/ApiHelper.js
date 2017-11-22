const { Urls } = require('../config/routes.js')

function login(userId, password, cb) {

  const loginParamters = {}
  
  loginParamters.userId = userId
  loginParamters.password = password
  loginParamters.accessHash = getAccessHash()

  if (loginSuccess){
    cb(data)
  }
  else {
      cb('server string error')  
  }

}


function register(fullName, userId, password, cb) {

  const loginParamters = {}
  
  loginParamters.fullName = fullName
  loginParamters.userId = userId
  loginParamters.password = password
  loginParamters.accessHash = getAccessHash()

  if (registerSuccess){
    cb(data)
  }
  else {
      cb('server string error')  
  }
}

function accessHash () {

 // TODO see where we store the hashkey
}


module.exports = {

  login,
  register
}