import React from 'react'
import { Keyboard } from 'react-native'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { GenericContainer } from '../components/View/'
import ContainerStyles from '../components/View/styles'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { GenericText, GenericLink } from '../components/Text/'
import { Messages, Labels, Screens, SignUpConstraints, ServerProtocol, Keys } from '../config/settings'
import { register } from '../helpers/ApiHelper'
import { LoadingSpinner } from '../components/Spinner'
import ValidationHelper from '../helpers/ValidationHelper'
import { saveInitialData } from '../helpers/AsyncStorageHelper'

export default class SignUp extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      userFullName:'',
      userId:'',
      password:'',
      confirmPassword:'',
      errorMessage:'',
      message:'',
      focusPassword:false,
      spinnerVisible:false
    }
    this.signUp = this.signUp.bind(this)
    this.onSubmitUserFullName = this.onSubmitUserFullName.bind(this)
    this.onSubmitUserId = this.onSubmitUserId.bind(this)
    this.onSubmitPassword = this.onSubmitPassword.bind(this)
    this.goToSignIn = this.goToSignIn.bind(this)
  }

  signUp(){
    Keyboard.dismiss()
    var errorMessage
    
    if (this.state.userFullName.length == 0 || this.state.userId.length == 0 || this.state.password.length == 0){
        this.setState({errorMessage:Messages.INCOMPLETE_INPUT_DATA})
        return
    }
    
    errorMessage = ValidationHelper.userIdWithErrors(this.state.userId)
    if(errorMessage){
      this.setState({errorMessage})  
      return
    }

    errorMessage = ValidationHelper.passwordsWithErrors(this.state.password, this.state.confirmPassword)
    if(errorMessage){
      this.setState({errorMessage})  
      return
    }
    
    this.setState({errorMessage:"", spinnerVisible:true})
    register(this.state.userFullName, this.state.userId, this.state.password)
    .then(response =>{
      this.setState({spinnerVisible:false})
      if(response[ServerProtocol.statusField] == ServerProtocol.OK) {
        saveInitialData(response.data, this.state.userId)
        .then(()=>{
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName:Screens.HomeDrawerStack,params:{[Keys.isNewMember]:response.data[Keys.isNewMember]}})
            ],
            key: null
          })
          this.props.navigation.dispatch(resetAction)
        })
        .catch((errorMessage)=>{
          this.setState({errorMessage})      
        })
      }
      else{
        this.setState({message:response[ServerProtocol.messageField]})
      }
    })
    .catch(errorMessage => {
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({errorMessage:errorMessage}))
    })
  }
  
  onSubmitUserFullName(){
    if(!this.state.userId){
      this.userIdInput.focus()
    }
    else{
        this.signUp()
    }
  }
  
  onSubmitUserId(){
    if(!this.state.password){
      this.passwordInput.focus()
    }
    else{
        this.signUp()
    }
  }
  
  onSubmitPassword(){
    if(!this.state.confirmPassword){
      this.confirmPasswordInput.focus()
    }
    else{
        this.signUp()
    }
  }
  goToSignIn(){
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
              <GenericTextInput key={Labels.ENTER_FULL_NAME} value={this.state.userFullName}
                placeholder={Labels.ENTER_FULL_NAME} autoCorrect={false} autoCapitalize = 'words'
                autoFocus onChangeText={userFullName => this.setState({userFullName})}
                onSubmitEditing={this.onSubmitUserFullName}/>
            </GenericContainer>
            <GenericContainer style={ContainerStyles.textInputContainer} key={Labels.ENTER_USER_ID}>
              <GenericTextInput key={Labels.ENTER_USER_ID} value={this.state.userId}
                keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
                onChangeText={userId => this.setState({userId})}
                onSubmitEditing={this.onSubmitUserId}
                inputRef={el => this.userIdInput = el}/>
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