import React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Messages, Screens, SignUpConstraints, ServerProtocol } from '/config/settings'
import { register } from '/helpers/ApiHelper'
import ValidationHelper from '/helpers/ValidationHelper'
import StoreHelper from '/helpers/StoreHelper'
import { getDeviceToken } from '/helpers/NotificationsHelper'
import { RkTheme, RkTextInput } from 'react-native-ui-kitten'
import RootWrapper from '/components/containers/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import Button from '/components/presentationals/Button'
import GenericText from '/components/presentationals/GenericText'
import GenericLink from '/components/presentationals/GenericLink'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
import genericStyles from '/config/styles'

RkTheme.setType('RkTextInput', 'inputText', {
  backgroundColor: '#12194d',
  color: 'white',
  flex:1,
  input:{
    placeholderTextColor:'white',
    fontSize:20,
  }
})

RkTheme.setType('RkButton', 'signIn', {
  backgroundColor: genericStyles.genericButtonBackgroundColor,
  flex:1,
  content:{
    color:'white',
    fontSize:19,
    fontWeight:'bold'
  }
})

const styles = StyleSheet.create({
  memeberAlready: {
    fontSize:16,
    fontFamily:'gamja-flower-regular',
    marginTop:10
  },
  registerAccountTitle:{
    fontSize:20,
    fontFamily:'gamja-flower-regular'
  }
})

@connect(
state => ({notificationsToken:state.notificationsToken})
)
export default class SignUp extends React.Component{
  
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
      const deviceToken = this.props.notificationsToken ? this.props.notificationsToken : await getDeviceToken(this.props.dispatch)
      var httpResponse = await register(this.userFullName, this.userId, this.password, deviceToken)
        this.setState({spinnerVisible:false})
        if(httpResponse[ServerProtocol.statusField] == ServerProtocol.OK) {
          StoreHelper.clearStore(this.props.dispatch)
          StoreHelper.setInitialData(httpResponse.data, this.userId, this.password, this.props.dispatch)
          this.props.navigation.navigate(Screens.HomeStack)
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
      this.refs.userIdInput._focusInput()
    }
    else{
        this.signUp()
    }
  }
  
  onSubmitUserId = () =>{
    if(!this.password){
      this.refs.passwordInput._focusInput() 
    }
    else{
        this.signUp()
    }
  }
  
  onSubmitPassword = () =>{
    if(!this.confirmPassword){
      this.refs.confirmPasswordInput._focusInput()
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
      <RootWrapper style={{paddingTop:10}}>
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
          <CentredWrapper>
            <GenericText style={styles.registerAccountTitle}>
              REGISTRAR CUENTA
            </GenericText>
            <RkTextInput rkType='rounded inputText' placeholder='Nombre'
              autoFocus returnKeyType='next' keyboardType='default' autoCapitalize='words' autoCorrect={false}
              onChangeText={pUserFullName => this.userFullName = pUserFullName}
              onSubmitEditing={this.onSubmitUserFullName}/>
            
            <RkTextInput rkType='rounded inputText' placeholder='DNI'
              returnKeyType='next' keyboardType="numeric" autoCorrect={false} 
              ref="userIdInput" onChangeText={pUserId => this.userId = pUserId}
              onSubmitEditing={this.onSubmitUserId}/>

            <RkTextInput rkType='rounded inputText' placeholder='Contraseña'
              secureTextEntry autoCapitalize='none' autoCorrect={false} returnKeyType='next' keyboardType='default' ref="passwordInput"
              onChangeText={pPassword => this.password = pPassword} onSubmitEditing={this.onSubmitPassword}/>

            <RkTextInput rkType='rounded inputText' placeholder='Confirmar Contraseña'
              secureTextEntry autoCapitalize='none' autoCorrect={false} returnKeyType='done' keyboardType='default' ref="confirmPasswordInput"
              onChangeText={pConfirmPassword => this.confirmPassword = pConfirmPassword} onSubmitEditing={this.signUp}/>

            <View style={{flexDirection:'row', flex:1}}>
              <Button rkType='rounded signIn' contentStyle={styles[this.props.orientation]} text='REGISTRARME' onPress={this.signUp}/>
            </View>

            <GenericLink style={styles.memeberAlready} text='¿Ya tenés una cuenta? Iniciá Sesión' onPress={()=>this.goToSignIn}/>

            <GenericText error={this.state.errorMessage ? true : false}>
              {this.state.errorMessage}
              {this.state.message}
            </GenericText>
            
            <LoadingSpinner visible={this.state.spinnerVisible}/>

          </CentredWrapper>
        </KeyboardAvoidingView>
      </RootWrapper>
    )
  }
}