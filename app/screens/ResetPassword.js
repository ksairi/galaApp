import React from 'react'
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native'
import { ScreenOrientation } from 'expo'
import { connect } from 'react-redux'
import { Messages, Screens } from '/config/settings'
import { resetPassword } from '/helpers/ApiHelper'
import ValidationHelper from '/helpers/ValidationHelper'
import { ActionsCreators } from '/redux/actions'
import RootWrapper from '/components/presentationals/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import Button from '/components/presentationals/GenericButton'
import GenericText from '/components/presentationals/GenericText'
import GenericLink from '/components/presentationals/GenericLink'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
import { genericTextInputStyle, textWithLinkStyle } from '/components/styles'
import Header from '/components/containers/Header'
import AnalyticsHelper from '/helpers/AnalyticsHelper'
import RoundedTextInput from '/components/presentationals/RoundedTextInput'

const styles = {
  resetPasswordTitle: {
    fontSize: 15,
    fontFamily: 'brother-1816-bold'
  },
  hiddenKeyboardComponentsStyle: {
    textInputContainerStyle: { flex: 0.15 },
    rootWrapperStyle: { paddingTop: 15 },
    inputTextStyle: { flex: 0.4, marginTop: 0 },
    buttonContainerStyle: { flex: 0.2 },
    messageStyle: { flex: 0.2 },
    resetPasswordTitle: { flex: 0.1 }
  },
  showingKeyboardComponentsStyle: {
    textInputContainerStyle: { flex: 0.17 },
    rootWrapperStyle: { paddingTop: 5 },
    inputTextStyle: { flex: 0.45, marginTop: 0 },
    buttonContainerStyle: { flex: 0.15 },
    titleStyle: { flex: 0.1 },
    resetPasswordTitle: { flex: 0.15 }
  }
}

@connect(state => ({
  inResetFirstPasswordMode: state.inResetFirstPasswordMode,
  userId: state.userData.userId
}))
export default class ResetPassword extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <Header navigation={navigation} backScreen={Screens.SignIn} />
  })
  state = {
    hasErrors: false,
    message: '',
    spinnerVisible: false,
    showBackToSignIn: false,
    userId: '',
    password: '',
    confirmPassword: '',
    componentsStyle: styles.hiddenKeyboardComponentsStyle
  }

  componentDidMount () {
    AnalyticsHelper.setPageHit(Screens.ResetPassword)
    if (Platform.OS === 'ios') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    )
    BackHandler.addEventListener('hardwareBackPress', this.goBack)
  }

  goBack = () => {
    this.props.navigation.navigate(Screens.SignIn)
    return true
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
    BackHandler.removeEventListener('hardwareBackPress', this.goBack)
  }

  _keyboardDidShow = () => {
    this.setState({
      componentsStyle: styles.showingKeyboardComponentsStyle
    })
  }

  _keyboardDidHide = () => {
    this.setState({ componentsStyle: styles.hiddenKeyboardComponentsStyle })
  }

  onUserIdChangeText = userId => {
    this.setState({ userId })
  }

  onPasswordChangeText = password => {
    this.setState({ password })
  }

  onConfirmPasswordChangeText = confirmPassword => {
    this.setState({ confirmPassword })
  }

  onTextInputOnFocus = () => {
    this.setState({
      message: '',
      showBackToSignIn: false
    })
  }

  hideKeyboard = () => {
    Keyboard.dismiss()
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={{ flex: 1 }}>
          <RootWrapper style={this.state.componentsStyle.rootWrapperStyle}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
              <CentredWrapper>
                <GenericText
                  style={[
                    styles.resetPasswordTitle,
                    this.state.componentsStyle.resetPasswordTitle
                  ]}>
                  {this.props.inResetFirstPasswordMode
                    ? 'INGRESÁ UNA NUEVA CONTRASEÑA'
                    : 'RECUPERÁ TU CONTRASEÑA'}
                </GenericText>

                {!this.props.inResetFirstPasswordMode && (

                  <RoundedTextInput
                    containerStyle={this.state.componentsStyle.textInputContainerStyle}
                    inputStyle={[genericTextInputStyle.input, this.state.componentsStyle.inputTextStyle]}
                    inputProps={{
                      placeholder: 'DNI',
                      keyboardType: 'numeric',
                      autoFocus: true,
                      onChangeText: this.onUserIdChangeText,
                      onSubmitEditing: this.onSubmitUserId,
                      returnKeyType: 'next',
                      autoCorrect: false,
                      value: this.state.userId,
                      onFocus: this.onTextInputOnFocus
                    }}
                />
                )}
                <RoundedTextInput
                  containerStyle={this.state.componentsStyle.textInputContainerStyle}
                  inputStyle={[genericTextInputStyle.input, this.state.componentsStyle.inputTextStyle]}
                  inputProps={{
                    placeholder: 'Contraseña',
                    autoFocus: this.props.inResetFirstPasswordMode,
                    secureTextEntry: true,
                    onChangeText: this.onPasswordChangeText,
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    returnKeyType: 'next',
                    keyboardType: 'default',
                    ref: 'passwordInput',
                    onSubmitEditing: this.onSubmitPassword,
                    onFocus: this.onTextInputOnFocus
                  }}
                />

                <RoundedTextInput
                  containerStyle={this.state.componentsStyle.textInputContainerStyle}
                  inputStyle={[
                    genericTextInputStyle.input,
                    this.state.componentsStyle.inputTextStyle
                  ]}
                  inputProps={{
                    placeholder: 'Confirmar Contraseña',
                    secureTextEntry: true,
                    onChangeText: this.onConfirmPasswordChangeText,
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    returnKeyType: 'done',
                    keyboardType: 'default',
                    ref: 'confirmPasswordInput',
                    onSubmitEditing: this.doResetPassword,
                    onFocus: this.onTextInputOnFocus
                  }}
                />
                <View
                  style={[
                    { flexDirection: 'row' },
                    this.state.componentsStyle.buttonContainerStyle
                  ]}>
                  <Button text='ENVIAR' onPress={this.doResetPassword} />
                </View>

                {this.state.message !== '' && (
                  <GenericText
                    style={this.state.componentsStyle.messageStyle}
                    error={this.state.hasErrors}>
                    {this.state.message}
                  </GenericText>
                )}

                {this.state.showBackToSignIn &&
                  !this.props.inResetFirstPasswordMode && (
                  <View
                    style={[
                      textWithLinkStyle.container,
                      {
                        flex: 0.2,
                        flexDirection: 'column'
                      }
                    ]}>
                    <GenericText style={textWithLinkStyle.text}>
                      Contraseña actualizada!
                    </GenericText>
                    <GenericLink
                      containerStyle={textWithLinkStyle.link.container}
                      contentStyle={textWithLinkStyle.link.content}
                      onPress={this.goToSignIn}>
                      Volvé a loguearte
                    </GenericLink>
                  </View>
                  )}

                <LoadingSpinner visible={this.state.spinnerVisible} />
              </CentredWrapper>
            </KeyboardAvoidingView>
          </RootWrapper>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  doResetPassword = () => {
    var message
    Keyboard.dismiss()
    this.setState({ showBackToSignIn: false })

    if (
      (!this.props.inResetFirstPasswordMode && !this.state.userId) ||
      !this.state.password ||
      !this.state.confirmPassword
    ) {
      this.setState({
        message: Messages.INCOMPLETE_INPUT_DATA,
        hasErrors: true
      })
      return
    }
    if (!this.props.inResetFirstPasswordMode) {
      message = ValidationHelper.userIdWithErrors(this.state.userId)
      if (message) {
        this.setState({ message, hasErrors: true })
        return
      }
    }

    message = ValidationHelper.passwordsWithErrors(
      this.state.password,
      this.state.confirmPassword
    )
    if (message) {
      this.setState({ message, hasErrors: true })
      return
    }

    this.setState({ message: '', spinnerVisible: true })
    const userId = this.state.userId ? this.state.userId : this.props.userId
    resetPassword(userId, this.state.password)
      .then(data => {
        this.props.dispatch(
          ActionsCreators.setUserNewPassword(this.state.password)
        )
        this.setState({
          hasErrors: false,
          showBackToSignIn: true,
          userId: '',
          password: '',
          confirmPassword: '',
          spinnerVisible: false
        })

        if (this.props.inResetFirstPasswordMode) {
          this.props.dispatch(
            ActionsCreators.setInResetFirstPasswordMode(false)
          )
          this.props.navigation.navigate(Screens.HomeStack)
        }
      })
      .catch(message => {
        this.setState({})
        this.setState({ message, hasErrors: true, spinnerVisible: false })
      })
  }

  onSubmitUserId = () => {
    if (!this.state.password) {
      this.refs.passwordInput._focusInput()
    } else {
      this.doResetPassword()
    }
  }

  onSubmitPassword = () => {
    if (!this.state.confirmPassword) {
      this.refs.confirmPasswordInput._focusInput()
    } else {
      this.doResetPassword()
    }
  }

  goToSignIn = () => {
    this.props.navigation.navigate(Screens.SignIn)
  }
}
