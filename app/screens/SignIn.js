import React from 'react'
import { Keyboard, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { RkTheme, RkTextInput, RkText } from 'react-native-ui-kitten'
import { Messages, Screens, ServerProtocol } from '/config/settings'
import genericStyles from '/config/styles'
import { login } from '/helpers/ApiHelper'
import { setInitialData } from '/helpers/StoreHelper'
import ValidationHelper from '/helpers/ValidationHelper'
import { ActionsCreators } from '/redux/actions'
import RootWrapper from '/components/containers/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import Button from '/components/presentationals/Button'
import Header from '/components/presentationals/Header'
import GenericText from '/components/presentationals/GenericText'
import GenericLink from '/components/presentationals/GenericLink'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'

import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import icomoonConfig from '/icomoonConfig.json'


const Icon = createIconSetFromIcoMoon(icomoonConfig)


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
  noAccount: {
    fontSize:16,
    fontFamily:'gamja-flower-regular',
    marginTop:10
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
    password:''
  }

  componentDidMount() {
    if(this.props.isLoggedIn){
      this.setState({userId:this.props.userData.userId})
      this.setState({password:this.props.userData.password})          
    }
  }

  
  render(){
    return(
      <RootWrapper>
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
          <CentredWrapper>
            <Header />
            <View style={{flex:1}}>
              <Icon name="referrals" size={80} color='white'/>
            </View>
            <RkTextInput rkType='rounded inputText' placeholder='DNI' keyboardType='numeric'
              autoFocus onChangeText={userId => this.setState({userId})}
              onSubmitEditing={this.onSubmitUserId} returnKeyType='next'
              autoCapitalize='none' autoCorrect={false}
              value={this.props.isLoggedIn ? this.state.userId : null}/>

            <RkTextInput rkType='rounded inputText' placeholder='Contraseña'
              secureTextEntry onChangeText={password => this.setState({password})}
              autoCapitalize='none' autoCorrect={false} returnKeyType='done' keyboardType='default' ref="passwordInput"
              onSubmitEditing={this.signIn}
              value={this.props.isLoggedIn ? this.state.password : null}/>

            <View style={{flexDirection:'row', flex:1}}>
              <Button rkType='rounded signIn' contentStyle={styles[this.props.orientation]} text='INICIAR SESIÓN' onPress={this.signIn}/>
            </View>

            <GenericLink style={styles.noAccount} text='¿No tenés una cuenta? Creá una nueva' onPress={()=>this.goToSignUp}/>

            <GenericText error={this.state.errorMessage || this.props.autoLoginErrorMessage != '' ? true : false}>
              {this.state.errorMessage}
              {this.props.autoLoginErrorMessage}
            </GenericText>
          
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