//  @flow
import React from 'react'
import { GenericContainer } from '../components/View/'
import ContainerStyles from '../components/View/styles'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { GenericText, GenericLink } from '../components/Text/'
import { Messages, Labels, Screens, ServerProtocol, SignUpConstraints } from '../config/settings'
import { resetPassword } from '../helper/ApiHelper'
import { LoadingSpinner } from '../components/Spinner'

export default class ResetPassword extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      userId:'',
      password:'',
      confirmPassword:'',
      hasErrors:false,
      message:'',
      spinnerVisible:false,
      showBackToSignIn:false
    }
    this.doResetPassword = this.doResetPassword.bind(this)
    this.goToSignIn = this.goToSignIn.bind(this)
    this.onSubmitUserId = this.onSubmitUserId.bind(this)
    this.onSubmitPassword = this.onSubmitPassword.bind(this)
  }

  render(){
    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericText>
            {Messages.RESET_PASSWORD_EXPLANATION}
          </GenericText>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <GenericContainer style={ContainerStyles.textInputContainer} key={Labels.ENTER_USER_ID}>
              <GenericTextInput key={Labels.ENTER_USER_ID} value={this.state.userId}
                autoFocus keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
                onChangeText={userId => this.setState({userId})}
                onSubmitEditing={this.onSubmitUserId}/>
            </GenericContainer>
          </GenericContainer>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <GenericContainer style={ContainerStyles.textInputContainer} key={Labels.ENTER_PASSWORD}>
              <GenericTextInput key={Labels.ENTER_PASSWORD} value={this.state.password} placeholder={Labels.ENTER_PASSWORD}
                secureTextEntry onChangeText={password => this.setState({password})}
                onSubmitEditing={this.onSubmitPassword}
                inputRef={el => this.passwordInput = el}/>
            </GenericContainer>
            <GenericContainer style={ContainerStyles.textInputContainer} key={Labels.CONFIRM_PASSWORD}>
              <GenericTextInput key={Labels.CONFIRM_PASSWORD} value={this.state.confirmPassword} 
                placeholder={Labels.CONFIRM_PASSWORD}
                secureTextEntry onChangeText={confirmPassword => this.setState({confirmPassword})}
                onSubmitEditing={this.doResetPassword}
                inputRef={el => this.confirmPasswordInput = el}/>
            </GenericContainer>
          </GenericContainer>
          <SubmitButton key={Labels.SUBMIT} title={Labels.SUBMIT} onPress={() => this.doResetPassword}/>
          <GenericText key="GenericText" error={this.state.hasErrors}>
            {this.state.message}
          </GenericText>
          {this.state.showBackToSignIn && 
            <GenericLink onPress={() => this.goToSignIn}>{Labels.GO_BACK_TO_SIGN_IN} </GenericLink>
          }
          <LoadingSpinner key="spinner" visible={this.state.spinnerVisible}/>
        </GenericContainer>
      </GenericContainer>
    )
  }

  doResetPassword(){
    
    if(this.state.userId.length < SignUpConstraints.USER_ID_MIN_LENGTH){
      this.setState({message:Messages.INVALID_USER_ID_LENGTH, hasErrors:true})
      return
    }
    if(this.state.password.length < SignUpConstraints.PASSWORD_MIN_LENGTH){
      this.setState({message:Messages.INVALID_PASSWORD_LENGTH, hasErrors:true})
      return
    }
    if (this.state.password !== this.state.confirmPassword){
      this.setState({message:Messages.INVALID_CONFIRM_PASSWORD, hasErrors:true})
      return
    }

    this.setState({message:""});
    (async function(context, userId, password) {
      context.setState({spinnerVisible:true})
      var promise = await resetPassword(userId, password)
      context.setState({spinnerVisible:false})
      return promise
    })(this, this.state.userId, this.state.password)
    .then(data =>{
      this.setState({spinnerVisible:false})
        if(data[ServerProtocol.statusField] == ServerProtocol.OK) {
          this.setState({message:Messages.SUCCESSFULY_RESET_PASSWORD, hasErrors:false,
            showBackToSignIn:true})
        }
        else {
          this.setState({message:data[ServerProtocol.messageField], hasErrors:true})  
        }
    })
    .catch(error => {
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({message:error.message, hasErrors:true}))
    })
  }

  onSubmitUserId(){
    if(!this.state.password){
      this.passwordInput.focus()
    }
    else{
        this.doResetPassword()
    }
  }
  
  onSubmitPassword(){
    if(!this.state.confirmPassword){
      this.confirmPasswordInput.focus()
    }
    else{
        this.doResetPassword()
    }
  }

  goToSignIn() {
    this.setState({message:""});
    this.props.navigation.navigate(Screens.SignIn)
  }
}