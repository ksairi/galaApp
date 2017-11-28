import React from 'react'
import { CentredWrapper, TextInputWrapper } from '../components/View/'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { ErrorText } from '../components/Text/'
import { Messages, Labels, Keys, Screens } from '../config/settings'
import { GenericStyles } from '../config/styles'
import { login } from '../helper/ApiHelper'

export default class SignIn extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      userId:'',
      password:'',
      errorMessage:'',
      focusPassword:false
    }
    this.signIn = this.signIn.bind(this)
    this.onSubmitUserId = this.onSubmitUserId.bind(this)
  }

  render(){
    return (
    <CentredWrapper>
      <TextInputWrapper key={Labels.ENTER_USER_ID}>
        <GenericTextInput key={Labels.ENTER_USER_ID} value={this.state.userId}
          keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
          autoFocus onChangeText={(userId) => this.setState({userId:userId})}
          onSubmitEditing={this.onSubmitUserId}/>
      </TextInputWrapper>
        
      <TextInputWrapper key={Labels.ENTER_PASSWORD}>
        <GenericTextInput key={Labels.ENTER_PASSWORD} value={this.state.password} placeholder={Labels.ENTER_PASSWORD}
          secureTextEntry onChangeText={(password) => this.setState({password})}
          focus={this.state.focusPassword}
          onSubmitEditing={this.signIn}
          inputRef={el => this.passwordInput = el}/>
      </TextInputWrapper>
      <SubmitButton key={Labels.SIGN_IN} title={Labels.SIGN_IN} onPress= {() => this.signIn}/>
      <ErrorText key="ErrorMessage">
        {this.state.errorMessage}
      </ErrorText>
      
    </CentredWrapper>
  )

  }

  signIn(){
    if (this.state.userId.length == 0 || this.state.password.length == 0){
        this.setState({errorMessage:Messages.INVALID_USER_PASSWORD})
        return
      }
      this.setState({errorMessage:""});
      (async function(userId, password) {
        //TODO show loading
        var promise = await login(userId, password)
        //TODO hide loading
        return promise
      })(this.state.userId,this.state.password)
      .then(data =>{
        //TODO save data in localstorage
          this.navigation.navigate(Screens.Home)
        })
      .catch(error => {
        
        this.setState((prevState, props) => ({errorMessage:error.message}))
      })
  }

  onSubmitUserId(){
    if(!this.state.password){
      this.passwordInput.focus()
    }
    else{
        this.signIn()
    }
  }
}