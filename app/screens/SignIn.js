import React from 'react'
import { Keyboard, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { RkTheme, RkTextInput } from 'react-native-ui-kitten'
import { Messages, Screens, ServerProtocol } from '/config/settings'
import genericStyles from '/config/styles'
import { login } from '/helpers/ApiHelper'
import { setInitialData } from '/helpers/StoreHelper'
import ValidationHelper from '/helpers/ValidationHelper'
import { ActionsCreators } from '/redux/actions'
import RootWrapper from '/components/containers/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import Button from '/components/presentationals/GenericButton'
import GenericText from '/components/presentationals/GenericText'
import GenericLink from '/components/presentationals/GenericLink'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
import Icon from '/helpers/ImageHelper'
import { styleGenericTextInput } from '/components/presentationals/styles' 
import Logo from '/components/presentationals/Logo'

RkTheme.setType('RkTextInput', 'inputText', styleGenericTextInput)

const styles = StyleSheet.create({
  noAccount: {
    fontSize:16,
    fontFamily:'gamja-flower-regular',
    flex:0.5
  }
})

@connect(
state => ({
  userData: state.userData,
  isLoggedIn:state.isLoggedIn,
  autoLoginErrorMessage:state.autoLoginErrorMessage
  })
)
export default class SignIn extends React.Component{
    
  static navigationOptions = { header: null }

  state = {
    errorMessage:'',
    focusPassword:false,
    spinnerVisible:false,
    userId:'',
    password:'',
    isKeyboardOn:false
  }

  componentDidMount() {
    if(this.props.isLoggedIn){
      this.setState({userId:this.props.userData.userId})
      this.setState({password:this.props.userData.password})          
    }

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

  
  render(){
    var imageSize, imageFlex, logoSize, logoFlex, passwordMarginBottom, buttonStyle
    if(this.state.isKeyboardOn){
      logoSize = 150
      logoFlex = 2.4
      imageSize = 145
      imageFlex = 2.9
      passwordMarginBottom = 5
      buttonStyle = {height:30}
    }
    else{
      logoSize = 200
      logoFlex = 1.7
      imageSize = 250
      imageFlex = 3
      passwordMarginBottom = 20
      buttonStyle = {}
      
    }
     
    return(
      <RootWrapper>
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
          <CentredWrapper>
            <Logo style={{flex:logoFlex}} logoSize={logoSize}/>
            
            <Icon name="referrals" size={imageSize} color='white' style={{flex:imageFlex}}/>
            
            <RkTextInput rkType='rounded inputText' style={{flex:1}} placeholder='DNI' keyboardType='numeric'
              autoFocus onChangeText={userId => this.setState({userId})}
              onSubmitEditing={this.onSubmitUserId} returnKeyType='next'
              autoCapitalize='none' autoCorrect={false}
              value={this.props.isLoggedIn ? this.state.userId : null}/>

            <RkTextInput rkType='rounded inputText' style={{marginBottom:passwordMarginBottom}} placeholder='Contraseña'
              secureTextEntry onChangeText={password => this.setState({password})}
              autoCapitalize='none' autoCorrect={false} returnKeyType='done' keyboardType='default' ref="passwordInput"
              onSubmitEditing={this.signIn}
              value={this.props.isLoggedIn ? this.state.password : null}/>
            

            <View style={{flexDirection:'row', flex:1.1}}>
              <Button contentStyle={{}} style={buttonStyle} text='INICIAR SESIÓN' onPress={this.signIn}/>
            </View>

            <GenericLink style={styles.noAccount} text='¿No tenés una cuenta? Creá una nueva' onPress={()=>this.goToSignUp}/>

            { (this.state.errorMessage != '' ||
              this.props.autoLoginErrorMessage != '') && 
              <GenericText style={{flex:0.5}} error={this.state.errorMessage || this.props.autoLoginErrorMessage != '' ? true : false}>
                {this.state.errorMessage}
                {this.props.autoLoginErrorMessage}
              </GenericText>
            }
          
          <LoadingSpinner visible={this.state.spinnerVisible}/>

        </CentredWrapper>
        </KeyboardAvoidingView>
      </RootWrapper>
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
      this.refs.passwordInput._focusInput()
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