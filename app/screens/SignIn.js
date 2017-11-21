const React = require ('react')
    , { CentredWrapper, TextInputWrapper } = require('../components/View/')
    , { GenericTextInput } = require('../components/TextInput/')
    , { SubmitButton } = require('../components/Button')
    , { ErrorText } = require('../components/Text/')
    , { compose, withHandlers, withReducer, lifecycle } = require('recompose')
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
      props.setErrorMessage("")
      //send to server
  		console.log(props.userId)
  		console.log(props.password)
  	}
  }),
  withHandlers({
    onSubmitUserId: props => () => {
      if (!props.password) {
        // SET FOCUS ON PASSWORD
      }
      else{
        props.signIn()
      }
    }
  })
  /*withHandlers(() => {
    let textInput = null

    return {
        onRef: () => (ref) => (textInput = ref),
        focus: () => () => console.log(textInput)//textInput.focus()
    }
  }),
  lifecycle({
    componentDidMount() {
      console.log(this.props)
      this.props.focus()
    }
  })*/
)(SignIn)

function SignIn({userId, password, setUserId, setPassword, signIn, onSubmitUserId, errorMessage, onRef}) {
  
	return (
    hs(CentredWrapper, {[Keys.children]: [
      hs(TextInputWrapper, {key:0, [Keys.children]: [
    		hs(GenericTextInput, {key:0, value: userId, 
          keyboardType: "numeric", ref: onRef, placeholder: Labels.ENTER_USER_ID,
          autoFocus: true, onChangeText: (userId) => setUserId(userId),
          onSubmitEditing: onSubmitUserId})
        ]}),
      hs(TextInputWrapper, {key:1, [Keys.children]: [
    		hs(GenericTextInput, {key:0, value: password, placeholder: Labels.ENTER_PASSWORD, secureTextEntry:true,
          onChangeText: (password) => setPassword(password),
          onSubmitEditing: signIn})
      ]}),

  		hs(SubmitButton, {key:2, [Keys.buttonTitle]: Labels.SIGN_IN, onPress: () => signIn}),
  		hs(ErrorText, {key:3, [Keys.message]: errorMessage})
    ]})
  )
}

module.exports = {
  SignIn : component
}