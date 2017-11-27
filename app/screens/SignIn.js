import React from 'react'
import { CentredWrapper, TextInputWrapper } from '../components/View/'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { ErrorText } from '../components/Text/'
import { compose, withHandlers, withReducer, lifecycle } from 'recompose'
import { Messages, Labels, Keys, Screens } from '../config/settings'
import { GenericStyles } from '../config/styles'
import { login } from '../helper/ApiHelper'


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
      props.setErrorMessage("");
      (async function() {
        //TODO show loading
        var promise = await login(props.userId, props.password)
        //TODO hide loading
        return promise
      })()
      .then((data) =>{
        //TODO save data in localstorage
          props.navigation.navigate(Screens.Home)
        })
      .catch((error) => {
        console.log(error)
        props.setErrorMessage(error.message)
      })
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
    <CentredWrapper>
      <TextInputWrapper key="0">
        <GenericTextInput key="0" value={userId}
          keyboardType="numeric" ref={onRef} placeholder={Labels.ENTER_USER_ID}
          autoFocus onChangeText={(userId) => setUserId(userId)}
          onSubmitEditing={onSubmitUserId}/>
      </TextInputWrapper>
        
      <TextInputWrapper key="1">
        <GenericTextInput key="0" value={password} placeholder={Labels.ENTER_PASSWORD}
          secureTextEntry onChangeText={(password) => setPassword(password)}
          onSubmitEditing={signIn}/>
      </TextInputWrapper>
      <SubmitButton key="2" title={Labels.SIGN_IN} onPress= {() => signIn}/>
      <ErrorText key="3">
        {errorMessage}
      </ErrorText>
      
    </CentredWrapper>
  )
}

module.exports = {
  SignIn : component
}