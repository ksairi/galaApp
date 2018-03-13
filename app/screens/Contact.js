import React from 'react'
import { Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { GenericContainer } from '/components/presentationals/View'
import ContainerStyles from '/components/presentationals/View/styles'
import { GenericText } from '/components/presentationals/Text'
import { GenericTextInput } from '/components/presentationals/TextInput'
import { SubmitButton } from '/components/presentationals/Button'
import { LoadingSpinner } from '/components/presentationals/Spinner'
import { Messages, Labels, Screens, ServerProtocol } from '/config/settings'
import { sendComments } from '/helpers/ApiHelper'

@connect(
  state => ({userId: state.userData.userId})
)
export default class Contact extends React.Component {
  static comments

  state = {
    spinnerVisible:false,
    error:false,
    message:''
  }
  
  render() {
    return(
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.verticalContainer}>
            <GenericContainer style={[ContainerStyles.textInputContainer, {flex: 0}]}>
              <GenericTextInput key={Labels.ENTER_COMMENTS}
                placeholder={Labels.ENTER_COMMENTS}
                multiline={true}
                numberOfLines = {9}
                autoFocus onChangeText={pComments => this.comments = pComments}
                onSubmitEditing={this.doSendComments}/>
            </GenericContainer>
            <SubmitButton key={Labels.SUBMIT} title={Labels.SUBMIT} onPress= {() => this.doSendComments}/>
          </GenericContainer>
          <GenericText key="GenericText" error={this.state.error}>
            {this.state.message}
          </GenericText>
          <LoadingSpinner key="spinner" visible={this.state.spinnerVisible}/>
        </GenericContainer>
      </GenericContainer>
    )
  }

  doSendComments = () =>{
    Keyboard.dismiss()
    if (!this.comments){
        this.setState({message:Messages.INVALID_COMMENTS, error:true})
        return
    }
    this.setState({message:'', spinnerVisible:true})
      if (this.props.userId !== null){
        sendComments(this.props.userId, this.comments)
        .then(response =>{
          this.setState({spinnerVisible:false})
          if(response[ServerProtocol.statusField] == ServerProtocol.OK) {
            this.setState({message:Messages.SEND_COMMENTS_OK, error:false})  
          }
          else{
            this.setState({message:response[ServerProtocol.messageField], error:true})
          }
          
        })
        .catch(message => {
          this.setState((prevState, props) => ({message, error:true, spinnerVisible:false}))
        })
      }
      else {
          this.setState({message:Messages.SYSTEM_READ_ERROR, error:true, spinnerVisible:false})
      }
  }
}