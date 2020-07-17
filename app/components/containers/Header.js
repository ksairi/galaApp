import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import {connect} from "react-redux";
import * as Animatable from "react-native-animatable-promise";
import Icon from "helpers/ImageHelper";
import {containerPadding, genericBackgroundColor} from "components/styles";
import Logo from "components/presentationals/Logo";
import GenericText from "components/presentationals/GenericText";
import * as NetworkHelper from "helpers/NetworkHelper";
import ActionsCreators from "redux/actions/";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";

const styles = {
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: genericBackgroundColor,
    paddingTop: 10,
    paddingLeft: containerPadding,
  },
  backButton: {
    marginTop: 3,
    flex: 1,
  },
  portrait: {logo: {fontSize: 40}, wrapper: {}},
  landscape: {
    logo: {fontSize: 30},
    wrapper: {},
  },
  title: {fontSize: 19, color: "white", fontFamily: "brother-1816-bold"},
};
styles.firstButton = styles.backButton;

const AnimatedBanner = Animatable.createAnimatableComponent(View);

@connect((state) => ({
  orientation: state.currentOrientation,
  newNotificationsText: state.notificationsText,
}))
export default class Header extends React.PureComponent {
  static timeoutId;

  static unsubscribe;

  state = {
    isDeviceConnected: true,
    wasDeviceDisconnected: false,
    hideConnectedMessage: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.isHomeHeader !== prevState.isHomeHeader) {
      newState.isHomeHeader = nextProps.isHomeHeader;
    }
    if (nextProps.orientation) {
      newState.headerStyle =
        nextProps.orientation === "landscape"
          ? styles.landscape
          : styles.portrait;
    }
    return newState;
  }

  handleBannerRef = (ref) => (this.animatedBanner = ref);

  hideNotificationsText = () => {
    setTimeout(() => {
      this.props.dispatch(ActionsCreators.setNotificationsText(""));
    }, 4000);
  };

  componentDidUpdate(prevProps) {
    if (this.props.newNotificationsText !== "") {
      this.animatedBanner.transitionTo({opacity: 1}, 1000);
      this.hideNotificationsText();
    }
    if (prevProps.isDeviceConnected !== this.props.isDeviceConnected) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        isDeviceConnected: this.props.isDeviceConnected,
        wasDeviceDisconnected: !this.props.isDeviceConnected,
        hideConnectedMessage: this.props.isDeviceConnected,
      });
    }
  }

  handleConnectivityChange = async (connectionInfo) => {
    const isDeviceConnected = await NetworkHelper.isConnected(connectionInfo);
    this.setState({
      isDeviceConnected,
      wasDeviceDisconnected: isDeviceConnected,
      hideConnectedMessage: !isDeviceConnected,
    });
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      Header.unsubscribe = NetInfo.addEventListener(
        this.handleConnectivityChange
      );
    }
    const isDeviceConnected = await NetworkHelper.isConnected();
    this.setState({
      isDeviceConnected,
      wasDeviceDisconnected: !isDeviceConnected,
      hideConnectedMessage: isDeviceConnected,
    });
  }

  componentWillUnmount() {
    if (Platform.OS !== "web") {
      Header.unsubscribe();
    }
    clearTimeout(Header.timeoutId);
  }

  showBackToConnection = () => {
    if (this.state.wasDeviceDisconnected && !this.state.hideConnectedMessage) {
      Header.timeoutId = setTimeout(() => {
        this.setState({hideConnectedMessage: true});
      }, 3000);
      return (
        <GenericText
          style={{
            backgroundColor: "green",
          }}
        >
          Conectado!
        </GenericText>
      );
    }
    return null;
  };

  onMenuPressed = () => {
    this.props.navigation.toggleDrawer();
  };

  onBackPressed = () => {
    this.props.navigation.navigate(this.props.backScreen);
  };

  hideKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: genericBackgroundColor}}>
        <TouchableWithoutFeedback onPress={this.hideKeyboard}>
          <View style={this.state.headerStyle.wrapper}>
            <View style={styles.wrapper}>
              {this.props.newNotificationsText !== "" && (
                <AnimatedBanner
                  useNativeDriver
                  ref={this.handleBannerRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    flexDirection: "row",
                    width: Dimensions.get("window").width,
                    backgroundColor: "yellow",
                    zIndex: 2,
                    height: 30,
                    opacity: 0,
                    alignItems: "center",
                  }}
                >
                  <GenericText
                    style={{
                      color: genericBackgroundColor,
                      fontFamily: "lato-bold",
                    }}
                  >
                    {this.props.newNotificationsText}
                  </GenericText>
                </AnimatedBanner>
              )}

              <View
                style={{
                  flex: 0.9,
                  zIndex: 1,
                }}
              >
                {this.props.isHomeHeader && (
                  <TouchableOpacity
                    onPress={this.onMenuPressed}
                    style={styles.firstButton}
                  >
                    <Icon name="menu" size={20} color="white" />
                  </TouchableOpacity>
                )}
                {this.props.backScreen && (
                  <TouchableOpacity
                    onPress={this.onBackPressed}
                    style={styles.backButton}
                  >
                    <Ionicons name="md-arrow-back" size={25} color="white" />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  flex: 2.5,
                  flexDirection: "row",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                {this.props.title ? (
                  <Text
                    style={[
                      styles.title,
                      {fontSize: this.props.title.length >= 13 ? 15 : 19},
                    ]}
                  >
                    {this.props.title}
                  </Text>
                ) : (
                  <Logo style={this.state.headerStyle.logo} />
                )}
              </View>

              <View style={{flex: 1, flexDirection: "row", zIndex: 1}}>
                {!this.state.isDeviceConnected ? (
                  <GenericText
                    style={{
                      backgroundColor: "red",
                    }}
                  >
                    Sin conexión
                  </GenericText>
                ) : (
                  this.showBackToConnection()
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}
