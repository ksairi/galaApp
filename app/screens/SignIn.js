import React from 'react'
import { Keyboard } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { GenericContainer } from '/components/presentationals/View/'
import ContainerStyles from '/components/presentationals/View/styles'
import { GenericTextInput } from '/components/presentationals/TextInput/'
import { SubmitButton } from '/components/presentationals/Button'
import { LoadingSpinner } from '/components/presentationals/Spinner'
import { GenericText, GenericLink } from '/components/presentationals/Text/'
import { Messages, Labels, Screens, ServerProtocol } from '/config/settings'
import { login } from '/helpers/ApiHelper'
import { setInitialData } from '/helpers/StoreHelper'
import { getDeviceToken } from '/helpers/NotificationsHelper'
import ValidationHelper from '/helpers/ValidationHelper'
import { ActionsCreators } from '/redux/actions'
@connect(
state => ({
  notificationsToken:state.notificationsToken,
  userData: state.userData
  })
)
export default class SignIn extends React.Component{
  
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
      const deviceToken = this.props.notificationsToken ? this.props.notificationsToken : await getDeviceToken(this.props.dispatch)
      const httpResponse = await login(this.userId, this.password, deviceToken)
      this.setState({spinnerVisible:false})
      if(httpResponse[ServerProtocol.statusField] == ServerProtocol.OK) {
        console.log(httpResponse)
        setInitialData(httpResponse.data, this.userId, this.password, this.props.dispatch)
        this.props.navigation.dispatch(this.getNextAction())
      }
      else{
        console.log(httpResponse)
        this.setState({errorMessage:httpResponse[ServerProtocol.messageField]})
      }

    }catch(errorMessage){
      this.setState({spinnerVisible:false})
      if(Messages.CHECK_INTERNET_CONNECTION == errorMessage && this.userId == this.props.userData.userId && this.password == this.props.userData.password){ //offline login
        this.props.dispatch(ActionsCreators.setIsUsingCache(true))
        this.props.navigation.dispatch(this.getNextAction())
      }
      else{
        this.setState((prevState, props) => ({errorMessage})) 
      }
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

  getNextAction = () =>{
    return( 
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName:Screens.HomeStack})
        ],
        key: null
      })
    )
  }
}