import React from 'react'
import { Keyboard, AsyncStorage } from 'react-native'
import { GenericContainer } from '/components/View'
import ContainerStyles from '/components/View/styles'
import { GenericText } from '/components/Text'
import { GenericTextInput } from '/components/TextInput'
import { SubmitButton } from '/components/Button'
import { LoadingSpinner } from '/components/Spinner'
import { Messages, Labels, Screens, ServerProtocol, Keys } from '/config/settings'
import { sendComments } from '/helpers/ApiHelper'


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
    AsyncStorage.getItem(Keys.userId)
    .then((userId)=>{
      if (userId !== null){
        sendComments(userId, this.comments)
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
    })
    .catch((error)=>{
      this.setState({error:true, message:Messages.SYSTEM_READ_ERROR})
    })
  }
}