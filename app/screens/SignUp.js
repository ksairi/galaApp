const React = require ('react')
    , { RootView } = require('../components/View/')
    , { GenericInputText} = require('../components/TextInput/')
    , { SubmitButton } = require('../components/Button')
    , { GenericText } = require('../components/Text/')
    , { compose, withHandlers, withReducer } = require('recompose')
    , { Messages, Labels, Keys } = require('../config/settings')
    , { GenericStyles } = require ('../config/styles')


const hs = React.createElement

const component = compose(

  withReducer('userFullName', 'setUserFullName ', (state, action) => {
    return (action.userFullName ? action.userFullName : state)
  }, ''),
  withReducer('userId', 'setUserId', (state, action) => {
    return (action.userId ? action.userId : state)
  }, ''),
  withReducer('password', 'setPassword', (state, action) => {
    return (action.password ? action.password : state)
  }, ''),
  withReducer('confirmPassword', 'setConfirmPassword', (state, action) => {
    return (action.confirmPassword ? action.confirmPassword : state)
  }, ''),
  withReducer('errorMessage', 'setErrorMessage', (state, action) => {
    return (action.errorMessage ? action.errorMessage : state)
  }, ''),
  withHandlers({
    signUp: props => () => {
      if (props.userFullName.length == 0){
        setErrorMessage(Messages.INVALID_USER_FULLNAME)
        return
      }
      if (props.userId.length == 0 || props.password.length == 0){
        setErrorMessage(Messages.INVALID_USER_PASSWORD)
        return
      }
      if (props.password !== props.confirmPassword){
        setErrorMessage(Messages.INVALID_CONFIRM_PASSWORD)
        return
      }
      //send to server
      
      console.log(props.userFullName)
      console.log(props.userId)
      console.log(props.password)
    }
  })
)(SignIn)

function SignIn({setUserFullName, userId, password, confirmPassword, setUserId, 
  setPassword, setConfirmPassword, signUp, errorMessage}) {
  return (
    hs(RootView, {[Keys.children]: [
      hs(GenericInputText, {value: userFullName, label: Labels.ENTER_FULL_NAME
        onBlur: {() => setUserFullName}}),
      hs(GenericInputText, {value: userId, 
        keyboardType: "numeric", label: Labels.ENTER_USER_ID,
        onBlur:{() => setUserId}}),
      hs(GenericInputText, {value: password, label: Labels.ENTER_PASSWORD
        onBlur:{() => setPassword}}),
      hs(GenericInputText, {value: confirmPassword, label: Labels.CONFIRM_PASSWORD
        onBlur:{() => setConfirmPassword}}),
      hs(SubmitButton, {[Keys.buttonTitle]: Labels.SIGN_UP, onPress: signUp}),
      hs(GenericText, {[Keys.style]: GenericStyles.errorMessage , [Keys.message]: errorMessage})
    ]})
  )
}

module.exports = {
  SignIn : component
}Z