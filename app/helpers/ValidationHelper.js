import { Messages, SignUpConstraints } from '/config/settings'

exports.passwordsWithErrors = (password, confirmPassword) => {
  if(password.length < SignUpConstraints.PASSWORD_MIN_LENGTH){
      return Messages.INVALID_PASSWORD_LENGTH
  }
  if (password !== confirmPassword){
      return Messages.INVALID_CONFIRM_PASSWORD
  }
  return null
}

exports.userIdWithErrors = (userId) => {
  if(userId.length < SignUpConstraints.USER_ID_MIN_LENGTH){
    return Messages.INVALID_USER_ID_LENGTH
  }
  return null
}
exports.isObjectEmpty = (obj) => {

  return (obj == null || (Object.getOwnPropertyNames(obj).length == 0))
}