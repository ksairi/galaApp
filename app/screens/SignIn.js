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
    
    return action
  }, ''),
  withReducer('password', 'setPassword', (state, action) => {
    return action
  }, ''),
  withReducer('errorMessage', 'setErrorMessage', (state, action) => {
    return action
  }, ''),
  withHandlers({
  	signIn: props => () => {
  		if (props.userId.length == 0 || props.password.length == 0){
  			props.setErrorMessage(Messages.INVALID_USER_PASSWORD)
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
  		hs(GenericInputText, {key:0, value: userId, 
        keyboardType: "numeric", placeHolder: Labels.ENTER_USER_ID,
        onChangeText: (userId) => setUserId(userId)}),
  		hs(GenericInputText, {key:1, value: password, placeHolder: Labels.ENTER_PASSWORD, secureTextEntry:true,
        onChangeText: (password) => setPassword(password)}),
  		hs(SubmitButton, {key:2, [Keys.buttonTitle]: Labels.SIGN_IN, onPress: () => signIn}),
  		hs(GenericText, {key:3, [Keys.style]: GenericStyles.errorMessage, [Keys.message]: errorMessage})
    ]})
  )
}

module.exports = {
  SignIn : component
}