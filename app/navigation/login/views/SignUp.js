import React from 'react'
import { Keyboard } from 'react-native'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GenericContainer } from '/components/View/'
import ContainerStyles from '/components/View/styles'
import { GenericTextInput } from '/components/TextInput/'
import { SubmitButton } from '/components/Button'
import { GenericText, GenericLink } from '/components/Text/'
import { Messages, Labels, Screens, SignUpConstraints, ServerProtocol, Keys } from '/config/settings'
import { register } from '/helpers/ApiHelper'
import { LoadingSpinner } from '/components/Spinner'
import ValidationHelper from '/helpers/ValidationHelper'
import { saveInitialData } from '/helpers/AsyncStorageHelper'
import { getDeviceToken } from '/helpers/NotificationsHelper'
import { ActionsCreators } from '/redux/actions'

class SignUp extends React.Component{
  static userFullName
  static userId
  static password
  static confirmPassword

  state = {
    errorMessage:'',
    message:'',
    focusPassword:false,
    spinnerVisible:false
  }

  signUp = async () =>{
    Keyboard.dismiss()
    var errorMessage
    
    if (!this.userFullName || !this.userId || !this.password){
        this.setState({errorMessage:Messages.INCOMPLETE_INPUT_DATA})
        return
    }
    
    errorMessage = ValidationHelper.userIdWithErrors(this.userId)
    if(errorMessage){
      this.setState({errorMessage})  
      return
    }

    errorMessage = ValidationHelper.passwordsWithErrors(this.password, this.confirmPassword)
    if(errorMessage){
      this.setState({errorMessage})  
      return
    }
    
    this.setState({errorMessage:"", spinnerVisible:true})
    try{
      const deviceToken = await getDeviceToken()
      var httpResponse = await register(this.userFullName, this.userId, this.password, deviceToken)
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
          this.setState({message:httpResponse[ServerProtocol.messageField]})
        }
    }catch(errorMessage){
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({errorMessage}))
    }
  }
  
  onSubmitUserFullName = ()=>{
    if(!this.userId){
      this.userIdInput.focus()
    }
    else{
        this.signUp()
    }
  }
  
  onSubmitUserId = () =>{
    if(!this.password){
      this.passwordInput.focus()
    }
    else{
        this.signUp()
    }
  }
  
  onSubmitPassword = () =>{
    if(!this.confirmPassword){
      this.confirmPasswordInput.focus()
    }
    else{
        this.signUp()
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

  render(){
    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <GenericContainer style={ContainerStyles.textInputContainer} key={Labels.ENTER_FULL_NAME}>
              <GenericTextInput key={Labels.ENTER_FULL_NAME}
                placeholder={Labels.ENTER_FULL_NAME} autoCorrect={false} autoCapitalize = 'words'
                autoFocus onChangeText={pUserFullName => this.userFullName = pUserFullName}
                onSubmitEditing={this.onSubmitUserFullName}/>
            </GenericContainer>
            <GenericContainer style={ContainerStyles.textInputContainer} key={Labels.ENTER_USER_ID}>
              <GenericTextInput key={Labels.ENTER_USER_ID}
                keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
                onChangeText={pUserId => this.userId = pUserId}
                onSubmitEditing={this.onSubmitUserId}
                inputRef={el => this.userIdInput = el}/>
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
                onSubmitEditing={this.signUp}
                inputRef={el => this.confirmPasswordInput = el}/>
            </GenericContainer>
          </GenericContainer>
          <SubmitButton key={Labels.SIGN_UP} title={Labels.SIGN_UP} onPress= {() => this.signUp}/>
          <GenericLink key={Messages.USER_ALREADY} onPress={() => this.goToSignIn}>
              {Messages.USER_ALREADY}
          </GenericLink>
          <GenericText key="GenericText" error={this.state.errorMessage ? true : false}>
            {this.state.errorMessage}
            {this.state.message}
          </GenericText>
          <LoadingSpinner visible={this.state.spinnerVisible}/>
        </GenericContainer>
      </GenericContainer>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return Object.assign({}, {dispatch}, bindActionCreators(ActionsCreators, dispatch))
}

export default connect( ()=>({}), mapDispatchToProps )(SignUp)