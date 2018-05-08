import React from 'react'
import { View, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Messages, Screens, ServerProtocol, SignUpConstraints } from '/config/settings'
import { resetPassword } from '/helpers/ApiHelper'
import ValidationHelper from '/helpers/ValidationHelper'
import { ActionsCreators } from '/redux/actions'
import { RkTheme, RkTextInput } from 'react-native-ui-kitten'
import RootWrapper from '/components/containers/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import Button from '/components/presentationals/GenericButton'
import GenericText from '/components/presentationals/GenericText'
import GenericLink from '/components/presentationals/GenericLink'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
import { styleGenericTextInput } from '/components/presentationals/styles'

RkTheme.setType('RkTextInput', 'inputText', styleGenericTextInput)

const styles = StyleSheet.create({
  
  resetPasswordTitle:{
    fontSize:20,
    fontFamily:'gamja-flower-regular',
    flex:0.2
  }
})

  
@connect(state => ({
    orientation : state.currentOrientation
  })
)

export default class ResetPassword extends React.Component {
  
  state = {
    hasErrors:false,
    message:'',
    spinnerVisible:false,
    showBackToSignIn:false,
    isKeyboardOn:false,
    userId:'',
    password:'',
    confirmPassword:''
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow = ()=> {
    this.setState({isKeyboardOn:true, message:''})
  }

  _keyboardDidHide = ()=> {
    this.setState({isKeyboardOn:false})
  }

  render(){
    
    var rootWrapperStyle = {paddingTop:15},
        inputTextStyle = {flex:0.2, marginTop:0},
        buttonContainerStyle = {flex:0.3},
        messageStyle = {flex:0.2},
        titleStyle = {}

    if(this.state.isKeyboardOn){
      rootWrapperStyle = {paddingTop:10, paddingBottom:10}
      inputTextStyle = {flex:0.1, marginTop:0}
      buttonContainerStyle = {flex:0.1}
      titleStyle = {flex:0.1}
    }

    return (
      <RootWrapper style={rootWrapperStyle}>
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
          <CentredWrapper>
            <GenericText style={[styles.resetPasswordTitle]}>
              RECUPERÁ TU CONTRASEÑA
            </GenericText>
            <RkTextInput rkType='rounded inputText' style={inputTextStyle} autoFocus keyboardType="numeric" placeholder='DNI'
              returnKeyType='next' autoCorrect={false} onChangeText={userId => this.setState({userId})} 
              onSubmitEditing={this.onSubmitUserId} value={this.state.userId}/>

            <RkTextInput rkType='rounded inputText' style={inputTextStyle} placeholder='Contraseña'
              secureTextEntry autoCapitalize='none' autoCorrect={false} returnKeyType='next' keyboardType='default'
              onChangeText={password => this.setState({password})}
              onSubmitEditing={this.onSubmitPassword}
              ref="passwordInput" value={this.state.password}/>
              
            <RkTextInput rkType='rounded inputText' style={inputTextStyle} placeholder='Confirmá la contraseña'
              secureTextEntry autoCapitalize='none' autoCorrect={false} returnKeyType='done' keyboardType='default' 
              onChangeText={confirmPassword => this.setState({confirmPassword})} onSubmitEditing={this.doResetPassword}
              ref="confirmPasswordInput" value={this.state.confirmPassword}/>

            <View style={[{flexDirection:'row'}, buttonContainerStyle]}>
              <Button style={{}} text='ENVIAR' onPress={this.doResetPassword}/>
            </View>

            { this.state.message != '' && 
              <GenericText style={messageStyle} error={this.state.hasErrors}>
                {this.state.message}
              </GenericText>
            }
            {   this.state.showBackToSignIn && 
              
                <GenericLink containerStyle={messageStyle} contentStyle={{fontWeight:'bold'}} onPress={() => this.goToSignIn}> 
                  Contraseña actualizada. Volvé a loguearte desde aca 
                </GenericLink>
                
            }
            <LoadingSpinner visible={this.state.spinnerVisible}/>
          </CentredWrapper>
        </KeyboardAvoidingView>
      </RootWrapper>
    )
  }

  doResetPassword = () =>{
    var message
    Keyboard.dismiss()
    if (!this.state.userId || !this.state.password || !this.state.confirmPassword){
      this.setState({message:Messages.INCOMPLETE_INPUT_DATA, hasErrors:true})
      return
    }
    message = ValidationHelper.userIdWithErrors(this.state.userId)
    if(message){
      this.setState({message, hasErrors:true})
      return
    }
    
    message = ValidationHelper.passwordsWithErrors(this.state.password, this.state.confirmPassword)
    if(message){
      this.setState({message, hasErrors:true})
      return
    }

    this.setState({message:"", spinnerVisible:true})
    resetPassword(this.state.userId, this.state.password)
    .then(data =>{
      this.setState({spinnerVisible:false})
      if(data[ServerProtocol.statusField] == ServerProtocol.OK) {
        this.props.dispatch(ActionsCreators.setUserNewPassword(this.state.password))
        this.setState({hasErrors:false,
          showBackToSignIn:true, userId:'', password:'', confirmPassword:''})

      }
      else {
        this.setState({message:data[ServerProtocol.messageField], hasErrors:true})  
      }
    })
    .catch(message => {
      this.setState({spinnerVisible:false})
      this.setState((prevState, props) => ({message, hasErrors:true}))
    })
  }

  onSubmitUserId = () =>{
    if(!this.state.password){
      this.refs.passwordInput._focusInput()
    }
    else{
        this.doResetPassword()
    }
  }
  
  onSubmitPassword = () =>{
    if(!this.state.confirmPassword){
      this.refs.confirmPasswordInput._focusInput()
    }
    else{
        this.doResetPassword()
    }
  }

  goToSignIn = () =>{
    console.log('1')
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName:Screens.SignIn})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }
}