import React from 'react'
import { Keyboard } from 'react-native'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { GenericContainer } from '../components/View/'
import ContainerStyles from '../components/View/styles'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { GenericText, GenericLink } from '../components/Text/'
import { Messages, Labels, Screens, ServerProtocol, Keys } from '../config/settings'
import { login } from '../helpers/ApiHelper'
import { LoadingSpinner } from '../components/Spinner'
import { saveInitialData } from '../helpers/AsyncStorageHelper'
import { getDeviceToken } from '../helpers/NotificationsHelper'

export default class SignIn extends React.Component{
  
  static userId
  static password

  state = {
    errorMessage:'',
    focusPassword:false,
    spinnerVisible:false
  }
  
  render(){
    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <GenericContainer key={Labels.ENTER_USER_ID} style={ContainerStyles.textInputContainer}>
              <GenericTextInput key={Labels.ENTER_USER_ID} 
                keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
                autoFocus onChangeText={pUserId => this.userId = pUserId}
                onSubmitEditing={this.onSubmitUserId}/>
            </GenericContainer>
            <GenericContainer key={Labels.ENTER_PASSWORD} style={ContainerStyles.textInputContainer}>
              <GenericTextInput key={Labels.ENTER_PASSWORD} placeholder={Labels.ENTER_PASSWORD}
                secureTextEntry onChangeText={pPassword => this.password = pPassword}
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

  signIn = async () =>{
    Keyboard.dismiss()
    if (!this.userId || !this.password){
        this.setState({errorMessage:Messages.INVALID_USER_ID_PASSWORD})
        return
    }
    this.setState({errorMessage:"", spinnerVisible:true})
    try{
      const deviceToken = await getDeviceToken()
      login(this.userId, this.password, deviceToken)
      .then(response =>{
        this.setState({spinnerVisible:false})
        if(response[ServerProtocol.statusField] == ServerProtocol.OK) {
          saveInitialData(response.data, this.userId)
          .then(()=>{
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName:Screens.HomeDrawerStack, params:{[Keys.newMember]:response.data[Keys.newMember]}})
              ],
              key: null
            })
            this.props.navigation.dispatch(resetAction)

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
    }catch(errorMessage){
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({errorMessage})) 
    }
  }

  onSubmitUserId = () =>{
    if(!this.password){
      this.passwordInput.focus()
    }
    else{
        this.signIn()
    }
  }
  
  goToSignUp = () =>{
    this.setState({errorMessage:""})
    this.props.navigation.navigate(Screens.SignUp)

  }

  goToResetPassword = () =>{
    this.setState({errorMessage:""})
    this.props.navigation.navigate(Screens.ResetPassword)
  }
}