import React from 'react'
import { GenericContainer } from '../components/View/'
import ContainerSyles from '../components/View/styles'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { ErrorText, GenericLink } from '../components/Text/'
import { Messages, Labels, Screens, SignUpConstraints } from '../config/settings'
import { register } from '../helper/ApiHelper'
import { LoadingSpinner } from '../components/Spinner'

export default class SignUp extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      userFullName:'',
      userId:'',
      password:'',
      confirmPassword:'',
      errorMessage:'',
      focusPassword:false,
      spinnerVisible:false
    }
    this.signUp = this.signUp.bind(this)
    this.onSubmitUserFullName = this.onSubmitUserFullName.bind(this)
    this.onSubmitUserId = this.onSubmitUserId.bind(this)
    this.onSubmitPassword = this.onSubmitPassword.bind(this)
    this.goToSignIn = this.goToSignIn.bind(this)
  }

  render(){
    return (
      <GenericContainer style={ContainerSyles.startRootContainer}>
        <GenericContainer style={ContainerSyles.horizontalContainer}>
          <GenericContainer style={ContainerSyles.textInputContainer} key={Labels.ENTER_FULL_NAME}>
            <GenericTextInput key={Labels.ENTER_FULL_NAME} value={this.state.userFullName}
              placeholder={Labels.ENTER_FULL_NAME} autoCorrect={false}
              autoFocus onChangeText={userFullName => this.setState({userFullName})}
              onSubmitEditing={this.onSubmitUserFullName}/>
          </GenericContainer>
          <GenericContainer style={ContainerSyles.textInputContainer} key={Labels.ENTER_USER_ID}>
            <GenericTextInput key={Labels.ENTER_USER_ID} value={this.state.userId}
              keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
              onChangeText={userId => this.setState({userId})}
              onSubmitEditing={this.onSubmitUserId}
              inputRef={el => this.userIdInput = el}/>
          </GenericContainer>
        </GenericContainer>
          
        <GenericContainer style={ContainerSyles.horizontalContainer}>
          <GenericContainer style={ContainerSyles.textInputContainer} key={Labels.ENTER_PASSWORD}>
            <GenericTextInput key={Labels.ENTER_PASSWORD} value={this.state.password} placeholder={Labels.ENTER_PASSWORD}
              secureTextEntry onChangeText={password => this.setState({password})}
              onSubmitEditing={this.onSubmitPassword}
              inputRef={el => this.passwordInput = el}/>
          </GenericContainer>
          <GenericContainer style={ContainerSyles.textInputContainer} key={Labels.CONFIRM_PASSWORD}>
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
        <ErrorText key="ErrorMessage">
          {this.state.errorMessage}
        </ErrorText>
        <LoadingSpinner visible={this.state.spinnerVisible}/>        
      </GenericContainer>
    )
  }
  
  signUp(){
    if (this.state.userFullName.length == 0){
        this.setState({errorMessage:Messages.INVALID_USER_FULLNAME})
        return
      }
    if (this.state.userId.length == 0 || this.state.password.length == 0){
        this.setState({errorMessage:Messages.INVALID_USER_ID_PASSWORD})
        return
      }
      if (this.state.password !== this.state.confirmPassword){
        this.setState({errorMessage:Messages.INVALID_CONFIRM_PASSWORD})
        return
      }
      if(this.state.userId.length < SignUpConstraints.USER_ID_MIN_LENGTH){
        this.setState({errorMessage:Messages.INVALID_USER_ID_LENGTH})
        return
      }
      if(this.state.password.length < SignUpConstraints.PASSWORD_MIN_LENGTH){
        this.setState({errorMessage:Messages.INVALID_PASSWORD_LENGTH})
        return
      }
      this.setState({errorMessage:""});
      (async function(context, userFullName, userId, password) {
        context.setState({spinnerVisible:true})
        var promise = await register(userFullName, userId, password)
        context.setState({spinnerVisible:false})
        return promise
      })(this, this.state.userFullName, this.state.userId,this.state.password)
      .then(data =>{
        this.setState({spinnerVisible:false})
        //TODO save data in localstorage
          this.navigation.navigate(Screens.Home)
        })
      .catch(error => {
        this.setState({spinnerVisible:false})
        this.setState((prevState, props) => ({errorMessage:error.message}))
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
    this.props.navigation.navigate(Screens.SignIn)
  }
}