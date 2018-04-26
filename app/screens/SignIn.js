import React from 'react'
import { Keyboard } from 'react-native'
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
import ValidationHelper from '/helpers/ValidationHelper'
import { ActionsCreators } from '/redux/actions'

@connect(
state => ({
  userData: state.userData,
  isLoggedIn:state.isLoggedIn,
  autoLoginErrorMessage:state.autoLoginErrorMessage
  })
)
export default class SignIn extends React.Component{
  
  state = {
    errorMessage:'',
    focusPassword:false,
    spinnerVisible:false,
    userId:'',
    password:''
  }

  componentDidMount() {
    if(this.props.isLoggedIn){
      this.setState({userId:this.props.userData.userId})
      this.setState({password:this.props.userData.password})          
    }
  }

  
  render(){
    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <GenericContainer key={Labels.ENTER_USER_ID} style={ContainerStyles.textInputContainer}>
              <GenericTextInput key={Labels.ENTER_USER_ID} 
                keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
                autoFocus onChangeText={userId => this.setState({userId})}
                onSubmitEditing={this.onSubmitUserId}
                value={this.props.isLoggedIn ? this.state.userId : null}
              />
            </GenericContainer>
            <GenericContainer key={Labels.ENTER_PASSWORD} style={ContainerStyles.textInputContainer}>
              <GenericTextInput key={Labels.ENTER_PASSWORD} placeholder={Labels.ENTER_PASSWORD}
                secureTextEntry onChangeText={password => this.setState({password})}
                onSubmitEditing={this.signIn}
                inputRef={el => this.passwordInput = el}
                value={this.props.isLoggedIn ? this.state.password : null}/>
            </GenericContainer>
          </GenericContainer>
          <SubmitButton key={Labels.SIGN_IN} title={Labels.SIGN_IN} onPress= {() => this.signIn}/>
          <GenericLink key={Messages.FORGOT_PASSWORD} onPress={() => this.goToResetPassword}>
              {Messages.FORGOT_PASSWORD}
          </GenericLink>
          <GenericLink key={Messages.NO_ACCOUNT} onPress={() => this.goToSignUp}>
            {Messages.NO_ACCOUNT}
          </GenericLink>
          <GenericText key="GenericText" error={this.state.errorMessage || this.props.autoLoginErrorMessage != '' ? true : false}>
            {this.state.errorMessage}
            {this.props.autoLoginErrorMessage}
          </GenericText>
          <LoadingSpinner key="spinner" visible={this.state.spinnerVisible}/>
        </GenericContainer>
      </GenericContainer>
    )
  }

  signIn = async () =>{
    Keyboard.dismiss()
    if (!this.state.userId || !this.state.password){
        this.setState({errorMessage:Messages.INVALID_USER_ID_PASSWORD})
        return
    }
    this.setState({errorMessage:"", spinnerVisible:true})
    try{
      const httpResponse = await login(this.state.userId, this.state.password)
      this.setState({spinnerVisible:false})
      if(httpResponse[ServerProtocol.statusField] == ServerProtocol.OK) {
        setInitialData(httpResponse.data, this.state.userId, this.state.password, this.props.dispatch)
        this.props.navigation.navigate(Screens.HomeStack)
      }
      else{
        this.setState({errorMessage:httpResponse[ServerProtocol.messageField]})
      }

    }catch(errorMessage){
      this.setState({spinnerVisible:false})
      if(Messages.CHECK_INTERNET_CONNECTION == errorMessage && this.state.userId == this.props.userData.userId && this.state.password == this.props.userData.password){ //offline login
        this.props.dispatch(ActionsCreators.setIsUsingCache(true))
        this.props.navigation.navigate(Screens.HomeStack)
      }
      else{
        this.setState((prevState, props) => ({errorMessage})) 
      }
    }
  }

  onSubmitUserId = () =>{
    if(!this.state.password){
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