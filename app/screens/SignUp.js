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
import Button from '/components/presentationals/GenericButton'
import GenericText from '/components/presentationals/GenericText'
import GenericLink from '/components/presentationals/GenericLink'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
import { styleGenericTextInput } from '/components/presentationals/styles' 


RkTheme.setType('RkTextInput', 'inputText', styleGenericTextInput)

const styles = StyleSheet.create({
  memeberAlready: {
    fontSize:16,
    fontFamily:'gamja-flower-regular',
  },
  registerAccountTitle:{
    fontSize:20,
    fontFamily:'gamja-flower-regular'
  }
})

@connect(
state => (
  {
    notificationsToken:state.notificationsToken,
    orientation:state.currentOrientation
})
)
export default class SignUp extends React.Component{
  
  state = {
    errorMessage:'',
    focusPassword:false,
    spinnerVisible:false,
    isKeyboardOn:false
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
    this.setState({isKeyboardOn:true, errorMessage:''})
  }

  _keyboardDidHide = ()=> {
    this.setState({isKeyboardOn:false})
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
          this.setState({errorMessage:httpResponse[ServerProtocol.messageField]})
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
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName:Screens.SignIn})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render(){
    var textInputStyle = titleStyle =  {},
    rootWrapperStyle = {paddingTop:15},
    buttonContainerStyle = {flex:1},
    buttonContentStyle = {},
    memeberAlreadyStyle

    if(this.state.isKeyboardOn || this.props.orientation =='landscape'){
      textInputStyle = {marginTop:0, flex:0.5}
      titleStyle = {flex:0.5} 
      rootWrapperStyle = {paddingTop:10, paddingBottom:10}
      buttonContainerStyle = {flex:0.7}
      buttonContentStyle = {height:30}
      memeberAlreadyStyle = {flex:0.3}
    }
    return (
      <RootWrapper style={rootWrapperStyle}>
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
          <CentredWrapper>
            <GenericText style={[styles.registerAccountTitle, titleStyle]}>
              REGISTRAR CUENTA
            </GenericText>
            <RkTextInput rkType='rounded inputText' style={textInputStyle} placeholder='Nombre'
              autoFocus returnKeyType='next' keyboardType='default' autoCapitalize='words' autoCorrect={false}
              onChangeText={pUserFullName => this.userFullName = pUserFullName}
              onSubmitEditing={this.onSubmitUserFullName}/>
            
            <RkTextInput rkType='rounded inputText' style={textInputStyle} placeholder='DNI'
              returnKeyType='next' keyboardType="numeric" autoCorrect={false}
              ref="userIdInput" onChangeText={pUserId => this.userId = pUserId}
              onSubmitEditing={this.onSubmitUserId}/>

            <RkTextInput rkType='rounded inputText' style={textInputStyle} placeholder='Contraseña'
              secureTextEntry autoCapitalize='none' autoCorrect={false} returnKeyType='next' keyboardType='default' ref="passwordInput"
              onChangeText={pPassword => this.password = pPassword} onSubmitEditing={this.onSubmitPassword}/>

            <RkTextInput rkType='rounded inputText' style={textInputStyle} placeholder='Confirmar Contraseña'
              secureTextEntry autoCapitalize='none' autoCorrect={false} returnKeyType='done' keyboardType='default' ref="confirmPasswordInput"
              onChangeText={pConfirmPassword => this.confirmPassword = pConfirmPassword} onSubmitEditing={this.signUp}/>

            <View style={[{flexDirection:'row'}, buttonContainerStyle]}>
              <Button style={buttonContentStyle} text='REGISTRARME' onPress={this.signUp}/>
            </View>

            <GenericLink contentStyle={[styles.memeberAlready]} containerStyle={memeberAlreadyStyle} text='¿Ya tenés una cuenta? Iniciá Sesión' 
              onPress={()=>this.goToSignIn}/>
            
            { this.state.errorMessage != '' && 
              <GenericText style={{flex:0.3}} error={this.state.errorMessage ? true : false}>
                {this.state.errorMessage}
              </GenericText>
            }
            
            <LoadingSpinner visible={this.state.spinnerVisible}/>

          </CentredWrapper>
        </KeyboardAvoidingView>
      </RootWrapper>
    )
  }
}