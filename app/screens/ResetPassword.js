//  @flow
import React from 'react'
import { GenericContainer } from '../components/View/'
import ContainerStyles from '../components/View/styles'
import { GenericTextInput } from '../components/TextInput/'
import { SubmitButton } from '../components/Button'
import { GenericText } from '../components/Text/'
import { Messages, Labels, Screens, ServerProtocol } from '../config/settings'
import { resetPassword } from '../helper/ApiHelper'
import { isMailValid } from '../helper/StringHelper'
import { LoadingSpinner } from '../components/Spinner'

export default class ResetPassword extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      mail:'',
      hasErrors:false,
      message:'',
      spinnerVisible:false,
      showBackToSignIn:false
    }
    this.submit = this.submit.bind(this)
    this.goToSignIn = this.goToSignIn.bind(this)
  }

  render(){
    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericText>
            {Messages.RESET_PASSWORD_EXPLANATION}
          </GenericText>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <GenericContainer key={Labels.ENTER_MAIL} style={ContainerStyles.textInputContainer}>
              <GenericTextInput key={Labels.ENTER_MAIL} value={this.state.mail}
                keyboardType="email-address" placeholder={Labels.ENTER_MAIL}
                autoFocus onChangeText={mail => this.setState({mail})}
                onSubmitEditing={this.submit}/>
            </GenericContainer>
          </GenericContainer>
          <SubmitButton key={Labels.SUBMIT} title={Labels.SUBMIT} onPress={() => this.submit}/>
          <GenericText key="GenericText" error={this.state.hasErrors}>
            {this.state.message}
          </GenericText>
          {this.state.showBackToSignIn && 
            <GenericLink onPress={() => this.goToSignIn}>{Labels.GO_BACK_TO_SIGN_IN} </GenericLink>
          }
          <LoadingSpinner key="spinner" visible={this.state.spinnerVisible}/>
        </GenericContainer>
      </GenericContainer>
    )
  }

  submit(){
    
    if(!isMailValid(this.state.mail)){
      this.setState({message:Messages.INVALID_MAIL, hasErrors:true})
      return
    }

    this.setState({message:""});
    (async function(context, mail) {
      context.setState({spinnerVisible:true})
      var promise = await resetPassword(mail)
      context.setState({spinnerVisible:false})
      return promise
    })(this, this.state.mail)
    .then(data =>{
      this.setState({spinnerVisible:false})
        if(data[ServerProtocol.statusField] == ServerProtocol.OK) {
          this.setState({message:Messages.SUCCESSFULY_START_RESET_PASSWORD_PROCESS, hasErrors:false})
          this.setState({showBackToSignIn:true})
        }
        else {
          this.setState({message:data[ServerProtocol.messageField], hasErrors:true})  
        }
      })
    .catch(error => {
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({message:error.message, hasErrors:true}))
    })
  }

  goToSignIn() {
    this.setState({message:""});
    this.props.navigation.navigate(Screens.SignIn)
  }
}