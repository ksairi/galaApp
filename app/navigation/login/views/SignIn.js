import React from 'react'
import { Keyboard } from 'react-native'
import { AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { GenericContainer } from '/components/View/'
import ContainerStyles from '/components/View/styles'
import { GenericTextInput } from '/components/TextInput/'
import { SubmitButton } from '/components/Button'
import { GenericText, GenericLink } from '/components/Text/'
import { Messages, Labels, Screens, ServerProtocol, Keys } from '/config/settings'
import { login } from '/helpers/ApiHelper'
import { LoadingSpinner } from '/components/Spinner'
import { saveInitialData } from '/helpers/AsyncStorageHelper'
import { getDeviceToken } from '/helpers/NotificationsHelper'
import { ActionsCreators } from '/redux/actions'

class SignIn extends React.Component{
  
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
      const httpResponse = await login(this.userId, this.password, deviceToken)
      this.setState({spinnerVisible:false})
      if(httpResponse[ServerProtocol.statusField] == ServerProtocol.OK) {
        await saveInitialData(httpResponse.data, this.userId)
        const isNewMember = httpResponse.data[Keys.userData][Keys.newMember]
        this.props.setIsNewMember((isNewMember || isNewMember != null)? true : false)            
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName:Screens.HomeStack})
          ],
          key: null
        })
        this.props.navigation.dispatch(resetAction)
      }
      else{
        this.setState({errorMessage:httResponse[ServerProtocol.messageField]})
      }

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


function mapDispatchToProps(dispatch) {
  return Object.assign({}, {dispatch}, bindActionCreators(ActionsCreators, dispatch))
}

export default connect( ()=>({}), mapDispatchToProps )(SignIn)