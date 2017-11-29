import React from 'react'
import { CentredWrapper, TextInputWrapper } from '../components/View/'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { ErrorText, GenericText, GenericLink } from '../components/Text/'
import { Messages, Labels, Screens } from '../config/settings'
import { login } from '../helper/ApiHelper'
import { LoadingSpinner } from '../components/Spinner'

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
  }

  render(){
    return (
      <CentredWrapper>
        <LoadingSpinner visible={this.state.spinnerVisible}/>
        <TextInputWrapper key={Labels.ENTER_USER_ID}>
          <GenericTextInput key={Labels.ENTER_USER_ID} value={this.state.userId}
            keyboardType="numeric" placeholder={Labels.ENTER_USER_ID}
            autoFocus onChangeText={userId => this.setState({userId})}
            onSubmitEditing={this.onSubmitUserId}/>
        </TextInputWrapper>
          
        <TextInputWrapper key={Labels.ENTER_PASSWORD}>
          <GenericTextInput key={Labels.ENTER_PASSWORD} value={this.state.password} placeholder={Labels.ENTER_PASSWORD}
            secureTextEntry onChangeText={password => this.setState({password})}
            onSubmitEditing={this.signIn}
            inputRef={el => this.passwordInput = el}/>
        </TextInputWrapper>
        <SubmitButton key={Labels.SIGN_IN} title={Labels.SIGN_IN} onPress= {() => this.signIn}/>
        <GenericLink onPress={() => this.goToSignUp}>
            {Messages.FORGOT_PASSWORD}
          </GenericLink>
        <GenericText>
          {Messages.NO_ACCOUNT}
          <GenericLink onPress={() => this.goToSignUp}>
            {Labels.SIGN_UP}
          </GenericLink>
        </GenericText>
        <ErrorText key="ErrorMessage">
          {this.state.errorMessage}
        </ErrorText>
      </CentredWrapper>
    )
  }

  signIn(){
    if (this.state.userId.length == 0 || this.state.password.length == 0){
        this.setState({errorMessage:Messages.INVALID_USER_PASSWORD})
        return
    }
    this.setState({errorMessage:""});
    (async function(context, userId, password) {
      context.setState({spinnerVisible:true})
      var promise = await login(userId, password)
      context.setState({spinnerVisible:false})
      return promise
    })(this, this.state.userId,this.state.password)
    .then(data =>{
      this.setState({spinnerVisible:false})
      //TODO save data in localstorage
        this.props.navigation.navigate(Screens.Home)
      })
    .catch(error => {
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({errorMessage:error.message}))
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
    this.props.navigation.navigate(Screens.SignUp)

  }
}