import React from 'react'
import { Keyboard } from 'react-native'
import { AsyncStorage } from 'react-native'
import { GenericContainer } from '../components/View/'
import ContainerStyles from '../components/View/styles'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { GenericText, GenericLink } from '../components/Text/'
import { Messages, Labels, Screens, ServerProtocol, Keys } from '../config/settings'
import { login } from '../helpers/ApiHelper'
import { LoadingSpinner } from '../components/Spinner'
import { saveInitialData } from '../helpers/AsyncStorageHelper'

export default class SignIn extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      userId:'',
      password:'',
      errorMessage:'',
      focusPassword:false,
      spinnerVisible:false
    }
    this.signIn = this.signIn.bind(this)
    this.onSubmitUserId = this.onSubmitUserId.bind(this)
    this.goToSignUp = this.goToSignUp.bind(this)
    this.goToResetPassword = this.goToResetPassword.bind(this)
  }

  render(){
    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <GenericContainer key={Labels.ENTER_USER_ID} style={ContainerStyles.textInputContainer}>
              <GenericTextInput key={Labels.ENTER_USER_ID} value={this.state.userId}
                keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
                autoFocus onChangeText={userId => this.setState({userId})}
                onSubmitEditing={this.onSubmitUserId}/>
            </GenericContainer>
            <GenericContainer key={Labels.ENTER_PASSWORD} style={ContainerStyles.textInputContainer}>
              <GenericTextInput key={Labels.ENTER_PASSWORD} value={this.state.password} placeholder={Labels.ENTER_PASSWORD}
                secureTextEntry onChangeText={password => this.setState({password})}
                onSubmitEditing={this.signIn}
                inputRef={el => this.passwordInput = el}/>
            </GenericContainer>
          </GenericContainer>
          <SubmitButton key={Labels.SIGN_IN} title={Labels.SIGN_IN} onPress= {() => this.signIn}/>
          <GenericLink key={Messages.FORGOT_PASSWORD} onPress={() => this.goToResetPassword}>
              {Messages.FORGOT_PASSWORD}
          </GenericLink>
          <GenericLink key={Messages.NO_ACCOUNT} onPress={() => this.goToSignUp}>
            {Messages.NO_ACCOUNT}
          </GenericLink>
          <GenericText key="GenericText" error={this.state.errorMessage ? true : false}>
            {this.state.errorMessage}
          </GenericText>
          <LoadingSpinner key="spinner" visible={this.state.spinnerVisible}/>
        </GenericContainer>
      </GenericContainer>
    )
  }

  signIn(){
    Keyboard.dismiss()
    if (this.state.userId.length == 0 || this.state.password.length == 0){
        this.setState({errorMessage:Messages.INVALID_USER_ID_PASSWORD})
        return
    }
    this.setState({errorMessage:"", spinnerVisible:true})
    login(this.state.userId, this.state.password)
    .then(response =>{
      this.setState({spinnerVisible:false})
      if(response[ServerProtocol.statusField] == ServerProtocol.OK) {
        saveInitialData(response.data, this.state.userId)
        .then(()=>{
          //this.props.navigation.navigate(Screens.HomeDrawerStack)
          this.props.navigation.dispatch({
            key: Screens.HomeDrawerStack,
            type: Keys.replaceCurrentScreen,
            routeName: Screens.HomeDrawerStack,
            action:this.props.navigation.navigate(Screens.HomeDrawerStack)
          })
        })
        .catch((errorMessage) =>{
          this.setState({errorMessage}) 
        })
      }
      else{
        this.setState({errorMessage:response[ServerProtocol.messageField]})
      }
      
    })
    .catch(errorMessage => {
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({errorMessage}))
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
  
  goToSignUp(){
    this.setState({errorMessage:""})
    this.props.navigation.navigate(Screens.SignUp)

  }

  goToResetPassword(){
    this.setState({errorMessage:""})
    this.props.navigation.navigate(Screens.ResetPassword)
  }
}