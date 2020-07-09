import React from "react";
import {
  Keyboard,
  View,
  Platform,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import {connect} from "react-redux";
import {Messages, Screens} from "config/settings";
import * as LoginHelper from "helpers/LoginHelper";
import * as ValidationHelper from "helpers/ValidationHelper";
import * as NotificationsHelper from "helpers/NotificationsHelper";
import RootWrapper from "components/presentationals/RootWrapper";
import CentredWrapper from "components/presentationals/CentredWrapper";
import Button from "components/presentationals/GenericButton";
import GenericText from "components/presentationals/GenericText";
import GenericLink from "components/presentationals/GenericLink";
import LoadingSpinner from "components/presentationals/LoadingSpinner";
import {
  genericTextInputStyle,
  textWithLinkStyle,
  containerPadding,
} from "components/styles";
import Header from "components/containers/Header";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import RoundedTextInput from "components/presentationals/RoundedTextInput";
import CustomFormWrapper from "components/presentationals/CustomFormWrapper";

const styles = {
  registerAccountTitle: {
    fontSize: 16,
    fontFamily: "brother-1816-bold",
  },
  hiddenKeyboardComponentsStyle: {
    textInputContainerStyle: {marginTop: 10, marginBottom: 10},
    buttonContainerStyle: {flex: 1},
    buttonStyle: {height: 50},
    memeberAlreadyStyle: {flex: 0.4},
  },
  showingKeyboardComponentsStyle: {
    textInputStyle: {flex: 0.6},
    textInputContainerStyle: {flex: 0.3},
    titleStyle: {flex: 0.15},
    buttonContainerStyle: {flex: 0.3},
    buttonStyle: {height: 50},
    buttonContentStyle: {fontSize: 15},
    memeberAlreadyStyle: {flex: 0.6},
    confirmPassInputStyle: {marginBottom: 0},
  },
};

@connect((state) => ({
  deviceId: state.deviceId,
  loginSynchedDataParameters: state.loginSynchedDataParameters,
}))
export default class SignUp extends React.Component {
  static userfullName = null;

  static userId = null;

  static phoneNumber = null;

  static password = null;

  static confirmPassword = null;

  static isKeyboardShowing = false;

  constructor(props) {
    super(props);
    this.fullNameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.phoneNumberInput = React.createRef();
    this.confirmPasswordInput = React.createRef();
    this.state = {
      errorMessage: "",
      spinnerVisible: false,
      componentsStyle: styles.hiddenKeyboardComponentsStyle,
    };
  }

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.SignUp);
    if (Platform.OS === "ios") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  goBack = () => {
    this.props.navigation.navigate(Screens.SignIn);
    return true;
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  _keyboardDidShow = () => {
    SignUp.isKeyboardShowing = true;
    this.setState({
      componentsStyle: styles.showingKeyboardComponentsStyle,
    });
  };

  _keyboardDidHide = () => {
    SignUp.isKeyboardShowing = false;
    if (this) {
      this.setState({componentsStyle: styles.hiddenKeyboardComponentsStyle});
    }
  };

  signUp = async () => {
    Keyboard.dismiss();
    let errorMessage;

    if (
      !SignUp.userfullName ||
      !SignUp.userId ||
      !SignUp.password ||
      !SignUp.phoneNumber
    ) {
      this.setState({errorMessage: Messages.INCOMPLETE_INPUT_DATA});
      return;
    }

    errorMessage = ValidationHelper.userIdWithErrors(SignUp.userId);
    if (errorMessage) {
      this.setState({errorMessage});
      return;
    }

    errorMessage = ValidationHelper.passwordsWithErrors(
      SignUp.password,
      SignUp.confirmPassword
    );
    if (errorMessage) {
      this.setState({errorMessage});
      return;
    }

    this.setState({errorMessage: "", spinnerVisible: true});
    try {
      const deviceId = this.props.deviceId
        ? this.props.deviceId
        : await NotificationsHelper.getDeviceId(this.props.dispatch);
      await LoginHelper.register(
        SignUp.userfullName,
        SignUp.userId,
        SignUp.phoneNumber,
        SignUp.password,
        deviceId,
        this.props.loginSynchedDataParameters,
        this.props.dispatch
      );
      this.setState({spinnerVisible: false});
      this.props.navigation.navigate(Screens.HomeStack);
    } catch (errorMessage) {
      this.setState({spinnerVisible: false, errorMessage});
    }
  };

  onSubmitUserId = () => {
    if (!SignUp.userfullName) {
      this.fullNameInput.current.focus();
    } else {
      this.signIn();
    }
  };

  onSubmitName = () => {
    if (!SignUp.phoneNumber) {
      this.phoneNumberInput.current.focus();
    } else {
      this.signUp();
    }
  };

  onSubmitPhoneNumber = () => {
    if (!SignUp.password) {
      this.passwordInput.current.focus();
    } else {
      this.signUp();
    }
  };

  onSubmitPassword = () => {
    if (!SignUp.confirmPassword) {
      this.confirmPasswordInput.current.focus();
    } else {
      this.signUp();
    }
  };

  goToSignIn = () => {
    this.props.navigation.navigate(Screens.SignIn);
  };

  onFullNameChangeText = (fullName) => {
    SignUp.userfullName = fullName;
  };

  onPhoneNumberChangeText = (phoneNumber) => {
    SignUp.phoneNumber = phoneNumber;
  };

  onUserIdChangeText = (userId) => {
    SignUp.userId = userId;
  };

  onPasswordChangeText = (password) => {
    SignUp.password = password;
  };

  onConfirmPasswordChangeText = (password) => {
    SignUp.confirmPassword = password;
  };

  onInputTextOnFocus = () => {
    this.setState({
      errorMessage: "",
    });
  };

  hideKeyboard = () => {
    if (SignUp.isKeyboardShowing) {
      Keyboard.dismiss();
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={{flex: 1}}>
          <RootWrapper style={{paddingBottom: 0}}>
            <CustomFormWrapper>
              <CentredWrapper>
                <GenericText
                  style={[
                    styles.registerAccountTitle,
                    this.state.componentsStyle.titleStyle,
                  ]}
                >
                  REGISTRAR CUENTA
                </GenericText>

                <RoundedTextInput
                  containerStyle={
                    this.state.componentsStyle.textInputContainerStyle
                  }
                  inputStyle={[
                    genericTextInputStyle.input,
                    this.state.componentsStyle.textInputStyle,
                  ]}
                  inputProps={{
                    placeholder: "DNI",
                    keyboardType: "numeric",
                    autoFocus: true,
                    onChangeText: this.onUserIdChangeText,
                    onSubmitEditing: this.onSubmitUserId,
                    returnKeyType: "next",
                    autoCapitalize: "none",
                    autoCorrect: false,
                    onFocus: this.onInputTextOnFocus,
                  }}
                />
                <RoundedTextInput
                  containerStyle={
                    this.state.componentsStyle.textInputContainerStyle
                  }
                  inputStyle={[
                    genericTextInputStyle.input,
                    this.state.componentsStyle.textInputStyle,
                  ]}
                  inputProps={{
                    placeholder: "Nombre",
                    onChangeText: this.onFullNameChangeText,
                    onSubmitEditing: this.onSubmitName,
                    returnKeyType: "next",
                    keyboardType: "default",
                    ref: this.fullNameInput,
                    autoCapitalize: "words",
                    autoCorrect: false,
                    onFocus: this.onInputTextOnFocus,
                  }}
                />

                <RoundedTextInput
                  containerStyle={
                    this.state.componentsStyle.textInputContainerStyle
                  }
                  inputStyle={[
                    genericTextInputStyle.input,
                    this.state.componentsStyle.textInputStyle,
                  ]}
                  inputProps={{
                    placeholder: "Teléfono",
                    onChangeText: this.onPhoneNumberChangeText,
                    onSubmitEditing: this.onSubmitPhoneNumber,
                    keyboardType: "numeric",
                    returnKeyType: "next",
                    ref: this.phoneNumberInput,
                    autoCorrect: false,
                    onFocus: this.onInputTextOnFocus,
                  }}
                />

                <RoundedTextInput
                  containerStyle={
                    this.state.componentsStyle.textInputContainerStyle
                  }
                  inputStyle={[
                    genericTextInputStyle.input,
                    this.state.componentsStyle.textInputStyle,
                  ]}
                  inputProps={{
                    placeholder: "Contraseña",
                    secureTextEntry: true,
                    onChangeText: this.onPasswordChangeText,
                    autoCapitalize: "none",
                    autoCorrect: false,
                    returnKeyType: "next",
                    keyboardType: "default",
                    ref: this.passwordInput,
                    onSubmitEditing: this.onSubmitPassword,
                    onFocus: this.onInputTextOnFocus,
                  }}
                />

                <RoundedTextInput
                  containerStyle={
                    this.state.componentsStyle.textInputContainerStyle
                  }
                  inputStyle={[
                    genericTextInputStyle.input,
                    this.state.componentsStyle.textInputStyle,
                    this.state.componentsStyle.confirmPassInputStyle,
                  ]}
                  inputProps={{
                    placeholder: "Confirmar Contraseña",
                    secureTextEntry: true,
                    onChangeText: this.onConfirmPasswordChangeText,
                    autoCapitalize: "none",
                    autoCorrect: false,
                    returnKeyType: "done",
                    keyboardType: "default",
                    ref: this.confirmPasswordInput,
                    onSubmitEditing: this.signUp,
                    onFocus: this.onInputTextOnFocus,
                  }}
                />

                <View
                  style={[
                    {flexDirection: "row"},
                    this.state.componentsStyle.buttonContainerStyle,
                  ]}
                >
                  <Button
                    buttonStyle={this.state.componentsStyle.buttonStyle}
                    textStyle={this.state.componentsStyle.buttonContentStyle}
                    text="REGISTRARME"
                    onPress={this.signUp}
                  />
                </View>

                <View
                  style={[
                    textWithLinkStyle.container,
                    this.state.componentsStyle.memeberAlreadyStyle,
                  ]}
                >
                  <GenericText style={textWithLinkStyle.text}>
                    ¿Ya tenés una cuenta?
                  </GenericText>
                  <GenericLink
                    containerStyle={textWithLinkStyle.link.container}
                    contentStyle={textWithLinkStyle.link.content}
                    onPress={this.goToSignIn}
                  >
                    Iniciá Sesión
                  </GenericLink>
                </View>

                {this.state.errorMessage !== "" && (
                  <GenericText
                    style={{
                      fontSize: 13,
                      paddingLeft: containerPadding,
                      paddingRight: containerPadding,
                    }}
                    error={this.state.errorMessage || false}
                  >
                    {this.state.errorMessage}
                  </GenericText>
                )}

                <LoadingSpinner visible={this.state.spinnerVisible} />
              </CentredWrapper>
            </CustomFormWrapper>
          </RootWrapper>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
