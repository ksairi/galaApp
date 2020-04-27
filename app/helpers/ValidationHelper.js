import { Messages, SignUpConstraints } from '/config/settings'

exports.passwordsWithErrors = (password, confirmPassword) => {
  if (password.length < SignUpConstraints.PASSWORD_MIN_LENGTH) {
    return Messages.INVALID_PASSWORD_LENGTH
  }
  if (password !== confirmPassword) {
    return Messages.INVALID_CONFIRM_PASSWORD
  }
  if (password === confirmPassword && password === '12345') {
    return Messages.PASSWORD_TOO_EASY
  }
  return null
}

exports.userIdWithErrors = (userId) => {
  if (userId.length < SignUpConstraints.USER_ID_MIN_LENGTH) {
    return Messages.INVALID_USER_ID_LENGTH
  }
  return null
}
exports.isObjectEmpty = (obj) => {
  return (obj == null || (Object.getOwnPropertyNames(obj).length === 0))
}

exports.isMailValid = (email) => {
  const regex = /^(([^<>()\[\]\\.,:\s@']+(\.[^<>()\[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regex.test(email)
}
