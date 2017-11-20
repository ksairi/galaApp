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
 
  withReducer('userId', 'setUserId', (state, action) => {
    return (action.userId ? action.userId : state)
  }, ''),
  withReducer('password', 'setPassword', (state, action) => {
    return (action.password ? action.password : state)
  }, ''),
  withReducer('errorMessage', 'setErrorMessage', (state, action) => {
    return (action.errorMessage ? action.errorMessage : state)
  }, ''),
  withHandlers({
  	signIn: props => () => {
  		if (props.userId.length == 0 || props.password.length == 0){
  			setErrorMessage(Messages.INVALID_USER_PASSWORD)
        return
  		}
      //send to server
  		console.log(props.userId)
  		console.log(props.password)
  	}
  })
)(SignIn)

function SignIn({userId, password, setUserId, setPassword, signIn, errorMessage}) {
	return (
    hs(RootView, {[Keys.children]: [
  		hs(GenericInputText, {[Keys.componentValue]: userId, 
        keyboardType: "numeric", label: Labels.ENTER_USER_ID,
        onBlur:{() => setUserId()}}),
  		hs(GenericInputText, {Keys.componentValue: password, label: Labels.ENTER_PASSWORD
        onBlur:{() => setPassword()}}),
  		hs(SubmitButton, {[Keys.buttonTitle]: Labels.SIGN_IN, onPress: signIn}),
  		hs(GenericText, {[Keys.style]: GenericStyles.errorMessage , [Keys.message]: errorMessage})
    ]})
  )
}

module.exports = {
  SignIn : component
}