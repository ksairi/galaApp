import React from 'react'
import { View, Keyboard, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Messages, Screens, ServerProtocol, SignUpConstraints } from '/config/settings'
import { resetPassword } from '/helpers/ApiHelper'
import ValidationHelper from '/helpers/ValidationHelper'
import { ActionsCreators } from '/redux/actions'
import { RkTheme, RkTextInput } from 'react-native-ui-kitten'
import RootWrapper from '/components/presentationals/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import Button from '/components/presentationals/GenericButton'
import GenericText from '/components/presentationals/GenericText'
import GenericLink from '/components/presentationals/GenericLink'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
import { genericTextInputStyle, textWithLinkStyle } from '/components/styles'

RkTheme.setType('RkTextInput', 'inputText', genericTextInputStyle)

const styles = {
  resetPasswordTitle:{
    fontSize:16,
    fontFamily:'brother-1816-bold',
    marginTop:10
  },
  hiddenKeyboardComponentsStyle:{
    rootWrapperStyle:{paddingTop:15},
    inputTextStyle:{flex:0.15, marginTop:0},
    buttonContainerStyle:{flex:0.15},
    messageStyle:{flex:0.2},
    resetPasswordTitle:{flex:0.1}
  },
  showingKeyboardComponentsStyle:{
    rootWrapperStyle:{paddingTop:10, paddingBottom:10},
    inputTextStyle:{flex:0.1, marginTop:0},
    buttonContainerStyle:{flex:0.15},
    titleStyle:{flex:0.1},
    resetPasswordTitle:{flex:0.15}
  },
  landscapeComponentsStyle:{
    resetPasswordTitle:{
      flex:0.2
    },
    buttonContainerStyle:{flex:0.3}
  }
}


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
    userId:'',
    password:'',
    confirmPassword:'',
    componentsStyle : styles.hiddenKeyboardComponentsStyle
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.orientation == 'landscape'){
      return{
        componentsStyle: {...prevState.componentsStyle, ...styles.landscapeComponentsStyle},
      }
    }
    else{
      return {
        componentsStyle: { ...prevState.componentsStyle, ...styles.hiddenKeyboardComponentsStyle }
      }
    }
  }

  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount(){
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow = () =>{
    this.setState({componentsStyle : styles.showingKeyboardComponentsStyle, message:''})
  }

  _keyboardDidHide = () =>{
    this.setState({componentsStyle : styles.hiddenKeyboardComponentsStyle})
  }

  onUserIdChangeText = userId =>{
    this.setState({userId})
  }

  onConfirmPasswordChangeText = confirmPassword =>{
    this.setState({confirmPassword})
  }

  render(){

    return(
      <RootWrapper style={this.state.componentsStyle.rootWrapperStyle}>
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
          <CentredWrapper>
            <GenericText style={[styles.resetPasswordTitle, this.state.componentsStyle.resetPasswordTitle]}>
              RECUPERÁ TU CONTRASEÑA
            </GenericText>
            <RkTextInput rkType='rounded inputText' style={this.state.componentsStyle.inputTextStyle} autoFocus keyboardType="numeric" placeholder='DNI'
              returnKeyType='next' autoCorrect={false} onChangeText={this.onUserIdChangeText}
              onSubmitEditing={this.onSubmitUserId} value={this.state.userId}/>

            <RkTextInput rkType='rounded inputText' style={this.state.componentsStyle.inputTextStyle} placeholder='Contraseña'
              secureTextEntry autoCapitalize='none' autoCorrect={false} returnKeyType='next' keyboardType='default'
              onChangeText={password => this.setState({password})}
              onSubmitEditing={this.onSubmitPassword}
              ref="passwordInput" value={this.state.password}/>

            <RkTextInput rkType='rounded inputText' style={this.state.componentsStyle.inputTextStyle} placeholder='Confirmá la contraseña'
              secureTextEntry autoCapitalize='none' autoCorrect={false} returnKeyType='done' keyboardType='default'
              onChangeText={this.onConfirmPasswordChangeText} onSubmitEditing={this.doResetPassword}
              ref="confirmPasswordInput" value={this.state.confirmPassword}/>

            <View style={[{flexDirection:'row'}, this.state.componentsStyle.buttonContainerStyle]}>
              <Button style={{}} text='ENVIAR' onPress={this.doResetPassword}/>
            </View>

            { this.state.message != '' &&
              <GenericText style={this.state.componentsStyle.messageStyle} error={this.state.hasErrors}>
                {this.state.message}
              </GenericText>
            }

            { this.state.showBackToSignIn &&

              <View style={[textWithLinkStyle.container, {flex:0.2}]}>
                <GenericText style={textWithLinkStyle.text}>
                  Contraseña actualizada!
                </GenericText>
                <GenericLink containerStyle={textWithLinkStyle.link.container} contentStyle={textWithLinkStyle.link.content} onPress={this.goToSignIn}>
                  Volvé a loguearte
                </GenericLink>
              </View>
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
    this.setState({showBackToSignIn:false})

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
    .catch(message =>{
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
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName:Screens.SignIn})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }
}
