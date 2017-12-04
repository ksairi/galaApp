//  @flow
import React from 'react'
import { GenericContainer } from '../components/View/'
import ContainerSyles from '../components/View/styles'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { ErrorText, GenericText } from '../components/Text/'
import { Messages, Labels, Screens, ServerProtocol } from '../config/settings'
import { resetPassword } from '../helper/ApiHelper'
import { isMailValid } from '../helper/StringHelper'
import { LoadingSpinner } from '../components/Spinner'

export default class ResetPassword extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      mail:'',
      errorMessage:'',
      message:'',
      spinnerVisible:false,
      showBackToSignIn:false
    }
    this.submit = this.submit.bind(this)
    this.goToSignIn = this.goToSignIn.bind(this)
  }

  render(){
    return (
      <GenericContainer style={ContainerSyles.startRootContainer}>
        <GenericText>
          {Messages.RESET_PASSWORD_EXPLANATION}
        </GenericText>
        <GenericContainer key={Labels.ENTER_MAIL} style={ContainerSyles.textInputSizedContainer}>
          <GenericTextInput key={Labels.ENTER_MAIL} value={this.state.mail}
            keyboardType="email-address" placeholder={Labels.ENTER_MAIL}
            autoFocus onChangeText={mail => this.setState({mail})}
            onSubmitEditing={this.submit}/>
        </GenericContainer>
        <SubmitButton key={Labels.SUBMIT} title={Labels.SUBMIT} onPress= {() => this.submit}/>
        <ErrorText key="ErrorMessage">
          {this.state.errorMessage}
        </ErrorText>
        <GenericText key="Message">
          {this.state.message}
        </GenericText>
        {this.state.showBackToSignIn && 
          <GenericLink onPress={() => this.goToSignIn}>{Labels.GO_BACK_TO_SIGN_IN} </GenericLink>
        }
        <LoadingSpinner key="spinner" visible={this.state.spinnerVisible}/>
      </GenericContainer>
    )
  }

  submit(){
    if(isMailValid(this.state.mail)){
      this.setState({errorMessage:Messages.INVALID_MAIL})
    }

    this.setState({errorMessage:""});
    (async function(context, mail) {
      context.setState({spinnerVisible:true})
      var promise = await resetPassword(mail)
      context.setState({spinnerVisible:false})
      return promise
    })(this, this.state.mail)
    .then(data =>{
      this.setState({spinnerVisible:false})
        if(data[ServerProtocol.statusField] == ServerProtocol.OK) {
          this.setState({message:Messages.SUCCESSFULY_START_RESET_PASSWORD_PROCESS})
          this.setState({showBackToSignIn:true})
        }
        else {
          this.setState({errorMessage:data[ServerProtocol.messageField]})  
        }
      })
    .catch(error => {
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({errorMessage:error.message}))
    })
  }
  goToSignIn() {
    this.props.navigation.navigate(Screens.SignIn)
  }
}