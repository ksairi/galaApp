import React from 'react'
import { Keyboard } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { GenericContainer } from '/components/presentationals/View/'
import ContainerStyles from '/components/presentationals/View/styles'
import { GenericTextInput } from '/components/presentationals/TextInput/'
import { SubmitButton } from '/components/presentationals/Button'
import { GenericText, GenericLink } from '/components/presentationals/Text/'
import { LoadingSpinner } from '/components/presentationals/Spinner'
import { Messages, Labels, Screens, ServerProtocol, SignUpConstraints } from '/config/settings'
import { resetPassword } from '/helpers/ApiHelper'
import ValidationHelper from '/helpers/ValidationHelper'

export default class ResetPassword extends React.Component {
  static userId
  static password
  static confirmPassword

  state = {
    hasErrors:false,
    message:'',
    spinnerVisible:false,
    showBackToSignIn:false
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
                <GenericTextInput key={Labels.ENTER_USER_ID}
                  autoFocus keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
                  onChangeText={pUserId => this.userId = pUserId}
                  onSubmitEditing={this.onSubmitUserId}/>
              </GenericContainer>
            </GenericContainer>
            <GenericContainer style={ContainerStyles.horizontalContainer}>
              <GenericContainer style={ContainerStyles.textInputContainer} key={Labels.ENTER_PASSWORD}>
                <GenericTextInput key={Labels.ENTER_PASSWORD} placeholder={Labels.ENTER_PASSWORD}
                  secureTextEntry onChangeText={pPassword => this.password = pPassword}
                  onSubmitEditing={this.onSubmitPassword}
                  inputRef={el => this.passwordInput = el}/>
              </GenericContainer>
              <GenericContainer style={ContainerStyles.textInputContainer} key={Labels.CONFIRM_PASSWORD}>
                <GenericTextInput key={Labels.CONFIRM_PASSWORD} 
                  placeholder={Labels.CONFIRM_PASSWORD}
                  secureTextEntry onChangeText={pConfirmPassword => this.confirmPassword = pConfirmPassword}
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

  doResetPassword = () =>{
    var message
    Keyboard.dismiss()
    if (!this.userId || !this.password || !this.confirmPassword){
      this.setState({message:Messages.INCOMPLETE_INPUT_DATA, hasErrors:true})
      return
    }
    message = ValidationHelper.userIdWithErrors(this.userId)
    if(message){
      this.setState({message, hasErrors:true})
      return
    }
    
    message = passwordsWithErrors(this.password, this.confirmPassword)
    if(message){
      this.setState({message, hasErrors:true})
      return
    }

    this.setState({message:"", spinnerVisible:true})
    resetPassword(this.userId, this.password)
    .then(data =>{
      this.setState({spinnerVisible:false})
      if(data[ServerProtocol.statusField] == ServerProtocol.OK) {
        this.setState({message:Messages.SUCCESSFULY_RESET_PASSWORD, hasErrors:false,
          showBackToSignIn:true, userId:'', password:'', confirmPassword:''})
      }
      else {
        this.setState({message:data[ServerProtocol.messageField], hasErrors:true})  
      }
    })
    .catch(message => {
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({message, hasErrors:true}))
    })
  }

  onSubmitUserId = () =>{
    if(!this.password){
      this.passwordInput.focus()
    }
    else{
        this.doResetPassword()
    }
  }
  
  onSubmitPassword = () =>{
    if(!this.confirmPassword){
      this.confirmPasswordInput.focus()
    }
    else{
        this.doResetPassword()
    }
  }

  goToSignIn = () =>{
    this.setState({message:""})
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName:Screens.SignIn})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }
}