import { Messages, SignUpConstraints } from '/config/settings'

passwordsWithErrors = (password, confirmPassword) => {
  if(password.length < SignUpConstraints.PASSWORD_MIN_LENGTH){
      return Messages.INVALID_PASSWORD_LENGTH
  }
  if (password !== confirmPassword){
      return Messages.INVALID_CONFIRM_PASSWORD
  }
  return null
}

userIdWithErrors = (userId) => {
  if(userId.length < SignUpConstraints.USER_ID_MIN_LENGTH){
    return Messages.INVALID_USER_ID_LENGTH
  }
  return null
}

module.exports = {
  passwordsWithErrors,
  userIdWithErrors
}