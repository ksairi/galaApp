import React from "react";
import {
  Keyboard,
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import {connect} from "react-redux";
import * as Animatable from "react-native-animatable-promise";
import {Messages, Screens} from "config/settings";
import * as LoginHelper from "helpers/LoginHelper";
import RootWrapper from "components/presentationals/RootWrapper";
import CentredWrapper from "components/presentationals/CentredWrapper";
import Button from "components/presentationals/GenericButton";
import GenericText from "components/presentationals/GenericText";
import GenericLink from "components/presentationals/GenericLink";
import LoadingSpinner from "components/presentationals/LoadingSpinner";
import Logo from "components/presentationals/Logo";
import {
  genericTextInputStyle,
  textWithLinkStyle,
  containerPadding,
  genericBackgroundColor,
} from "components/styles";
import * as NotificationsHelper from "helpers/NotificationsHelper";
import ActionsCreators from "redux/actions";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import RoundedTextInput from "components/presentationals/RoundedTextInput";
import CustomFormWrapper from "components/presentationals/CustomFormWrapper";
import {SafeAreaView} from "react-native-safe-area-context";
import {RESTRICTED_PASSWORD} from "utils/userData";

const AnimatedLogo = Animatable.createAnimatableComponent(Logo);

const styles = {
  animatedLogoInitStyle: {flex: 1, fontSize: 55},
  animatedLogoEndStyle: {flex: 0.6, fontSize: 45},
  image: {
    marginBottom: 5,
    marginTop: 5,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.35,
  },

  rootWrapperStyle: {paddingTop: 10, padding: 0},
  hiddenKeyboardComponentsStyle: {
    passwordContainerStyle: {marginBottom: 10},
    buttonContainerStyle: {flex: 0.73},
    buttonStyle: {height: 55},
    linksContainerStyle: {flex: 0.7},
    firstLinkStyle: {flex: 0.5},
    secondLinkStyle: {flex: 0.5},
  },
  showingKeyboardComponentsStyle: {
    passwordContainerStyle: {marginBottom: 5},
    linksContainerStyle: {flex: 0.9},
    firstLinkStyle: {flex: 0.3},
    secondLinkStyle: {flex: 0.3},
  },
  landscape: {
    showingKeyboardComponentsStyle: {
      buttonContainerStyle: {flex: 0.47},
      buttonStyle: {height: 45},
      textStyle: {fontSize: 12},
      logoStyle: {flex: 0.45, fontSize: 23},
      linksContainerStyle: {flex: 0.7},
      firstLinkStyle: {flex: 0.3},
      secondLinkStyle: {flex: 0.5},
      passwordContainerStyle: {marginBottom: 0, marginTop: 0, flex: 0.4},
      inputStyle: {height: 30},
      inputContainerStyle: {flex: 0.4},
    },
  },
};

@connect((state) => ({
  userData: state.userData,
  isLoggedIn: state.isLoggedIn,
  orientation: state.currentOrientation,
  loginImages: state.loginImages,
  loginSynchedDataParameters: state.loginSynchedDataParameters,
  deviceId: state.deviceId,
  messages: state.messages,
  hasResetFirstPassword: state.hasResetFirstPassword,
  newMemberData: state.newMemberData,
  routines: state.routines,
}))
export default class SignIn extends React.Component {
  static isKeyboardShowing = false;

  static userId = null;

  static password = null;

  constructor(props) {
    super(props);
    this.passwordInput = React.createRef();
    this.state = {
      errorMessage: "",
      spinnerVisible: false,
      componentsStyle: styles.hiddenKeyboardComponentsStyle,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orientation === "landscape" && SignIn.isKeyboardShowing) {
      return {
        componentsStyle: {
          ...styles.landscape.showingKeyboardComponentsStyle,
        },
      };
    }
    return prevState;
  }

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.SignIn);
    if (Platform.OS !== "web") {
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
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    if (Platform.OS !== "web") {
      SignIn.isKeyboardShowing = true;
    }
    if (this.props.orientation !== "landscape") {
      this.setState({
        componentsStyle: styles.showingKeyboardComponentsStyle,
      });
      this.animatedLogo.transitionTo(styles.animatedLogoEndStyle, 500);
    } else {
      this.setState({
        componentsStyle: styles.landscape.showingKeyboardComponentsStyle,
      });
      this.animatedLogo.transitionTo(
        styles.landscape.showingKeyboardComponentsStyle.logoStyle,
        500
      );
    }
  };

  _keyboardDidHide = () => {
    if (Platform.OS !== "web") {
      SignIn.isKeyboardShowing = false;
    }

    this.setState({componentsStyle: styles.hiddenKeyboardComponentsStyle});
    this.animatedLogo.transitionTo(styles.animatedLogoInitStyle, 500);
  };

  handleAnimatedLogo = (ref) => (this.animatedLogo = ref);

  onUserIdChangeText = (userId) => {
    SignIn.userId = userId;
  };

  onPasswordChangeText = (password) => {
    SignIn.password = password;
  };

  onInputTextFocus = () => {
    if (Platform.OS === "web") {
      this._keyboardDidShow();
    }
    this.setState({
      errorMessage: "",
    });
  };

  onBlur = () => {
    if (Platform.OS === "web") {
      this._keyboardDidHide();
    }
  };

  hideKeyboard = () => {
    if (Platform.OS !== "web" && SignIn.isKeyboardShowing) {
      Keyboard.dismiss();
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <SafeAreaView
          style={{backgroundColor: genericBackgroundColor, flex: 1}}
        >
          <View style={{flex: 1}}>
            <RootWrapper
              style={[
                styles.rootWrapperStyle,
                {
                  marginTop:
                    Platform.OS === "ios" &&
                    this.props.orientation === "landscape"
                      ? 20
                      : 0,
                },
              ]}
            >
              <CustomFormWrapper>
                <CentredWrapper>
                  <AnimatedLogo
                    style={styles.animatedLogoInitStyle}
                    ref={this.handleAnimatedLogo}
                  />

                  {this.props.orientation === "portrait" &&
                    this.state.componentsStyle ===
                      styles.hiddenKeyboardComponentsStyle && (
                      <Image
                        source={
                          this.props.loginImages.length > 0 &&
                          this.props.loginImages[0].imageIndex === 0
                            ? require("assets/images/login.jpg")
                            : {uri: this.props.loginImages[0].uri}
                        }
                        style={styles.image}
                        resizeMode="contain"
                      />
                    )}

                  <RoundedTextInput
                    containerStyle={[
                      {
                        marginBottom: 0,
                        marginLeft: containerPadding,
                        marginRight: containerPadding,
                      },
                      genericTextInputStyle.container,
                      this.state.componentsStyle.inputContainerStyle,
                    ]}
                    inputStyle={[
                      genericTextInputStyle.input,
                      this.state.componentsStyle.inputStyle,
                    ]}
                    inputProps={{
                      placeholder: "DNI",
                      keyboardType: "numeric",
                      autoFocus: true,
                      onChangeText: this.onUserIdChangeText,
                      onSubmitEditing: this.onSubmitUserId,
                      returnKeyType: "next",
                      autoCapitalize: "none",
                      autoCorrect: true,
                      onFocus: this.onInputTextFocus,
                      onBlur: this.onBlur,
                    }}
                  />

                  <RoundedTextInput
                    containerStyle={[
                      {
                        marginLeft: containerPadding,
                        marginRight: containerPadding,
                      },
                      genericTextInputStyle.container,
                      this.state.componentsStyle.passwordContainerStyle,
                    ]}
                    inputStyle={[
                      genericTextInputStyle.input,
                      this.state.componentsStyle.inputStyle,
                    ]}
                    inputProps={{
                      placeholder: "Contraseña",
                      secureTextEntry: true,
                      onChangeText: this.onPasswordChangeText,
                      autoCapitalize: "none",
                      autoCorrect: false,
                      returnKeyType: "done",
                      keyboardType: "default",
                      ref: this.passwordInput,
                      onSubmitEditing: this.signIn,
                      onFocus: this.onInputTextFocus,
                      onBlur: this.onBlur,
                    }}
                  />

                  <View
                    style={[
                      {
                        flexDirection: "row",
                        marginLeft: containerPadding,
                        marginRight: containerPadding,
                      },
                      this.state.componentsStyle.buttonContainerStyle,
                    ]}
                  >
                    <Button
                      buttonStyle={this.state.componentsStyle.buttonStyle}
                      textStyle={this.state.componentsStyle.textStyle}
                      text="INICIAR SESIÓN"
                      onPress={this.signIn}
                    />
                  </View>

                  <View style={this.state.componentsStyle.linksContainerStyle}>
                    <View
                      style={[
                        textWithLinkStyle.container,
                        this.state.componentsStyle.firstLinkStyle,
                      ]}
                    >
                      <GenericText style={textWithLinkStyle.text}>
                        ¿No tenés una cuenta?
                      </GenericText>
                      <GenericLink
                        containerStyle={textWithLinkStyle.link.container}
                        contentStyle={textWithLinkStyle.link.content}
                        onPress={this.goToSignUp}
                      >
                        Creá una nueva
                      </GenericLink>
                    </View>

                    <View
                      style={[
                        textWithLinkStyle.container,
                        this.state.componentsStyle.secondLinkStyle,
                      ]}
                    >
                      <GenericText style={textWithLinkStyle.text}>
                        ¿Olvidaste tu contraseña?
                      </GenericText>
                      <GenericLink
                        containerStyle={textWithLinkStyle.link.container}
                        contentStyle={textWithLinkStyle.link.content}
                        onPress={this.goToResetPassword}
                      >
                        Recuperala
                      </GenericLink>
                    </View>
                  </View>

                  {this.state.errorMessage !== "" && (
                    <GenericText
                      style={{
                        flex: 0.7,
                        marginLeft: containerPadding,
                        marginRight: containerPadding,
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
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  signIn = async () => {
    if (Platform.OS === "web") {
      Keyboard.dismiss();
    } else {
      if (SignIn.password === RESTRICTED_PASSWORD) {
        this.setState({errorMessage: "Por favor acceder desde la web!"});
        return;
      }
    }
    if (!SignIn.userId || !SignIn.password) {
      this.setState({errorMessage: Messages.INVALID_USER_ID_PASSWORD});
      return;
    }
    this.setState({errorMessage: "", spinnerVisible: true});
    try {
      const deviceId = this.props.deviceId
        ? this.props.deviceId
        : await NotificationsHelper.getDeviceId(this.props.dispatch);
      await LoginHelper.login(
        SignIn.userId,
        SignIn.password,
        deviceId,
        this.props.loginSynchedDataParameters,
        this.props.messages,
        this.props.dispatch,
        {
          data: {
            userData: this.props.userData,
            hasResetFirstPassword: this.props.hasResetFirstPassword,
            newMemberData: this.props.newMemberData,
            routines: this.props.routines,
          },
        }
      );
      this.setState({spinnerVisible: false});
      if (!this.props.hasResetFirstPassword) {
        this.props.dispatch(ActionsCreators.setInResetFirstPasswordMode(true));
      }
    } catch (errorMessage) {
      this.setState({spinnerVisible: false});
      if (
        Messages.CHECK_INTERNET_CONNECTION === errorMessage &&
        SignIn.userId === this.props.userData.userId &&
        SignIn.password === this.props.userData.password
      ) {
        // offline login
        this.props.dispatch(ActionsCreators.setIsInSession(true));
        this.props.dispatch(ActionsCreators.login());
      } else {
        this.setState({errorMessage});
      }
    }
  };

  onSubmitUserId = () => {
    if (!SignIn.password) {
      this.passwordInput.current.focus();
    } else {
      this.signIn();
    }
  };

  goToSignUp = () => {
    Keyboard.dismiss();
    this.setState({errorMessage: ""});
    this.props.navigation.navigate(Screens.SignUp);
  };

  goToResetPassword = () => {
    Keyboard.dismiss();
    this.setState({errorMessage: ""});
    setTimeout(() => {
      this.props.navigation.navigate(Screens.ResetPassword);
    }, 1);
  };
}
