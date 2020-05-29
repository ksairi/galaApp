import React from "react";
import moment from "moment";
import {View, TouchableOpacity, Platform} from "react-native";
import {connect} from "react-redux";
import {Screens} from "config/settings";
import ActionsCreators from "redux/actions";
import {Text} from "react-native-animatable-promise";
import {genericBackgroundColor} from "components/styles";
import {Ionicons, Entypo} from "@expo/vector-icons";
import {detect} from "detect-browser";
import * as Animatable from "react-native-animatable-promise";

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: genericBackgroundColor,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

const IOSAnimatedIcon = Animatable.createAnimatableComponent(Ionicons);
const AndroidAnimatedIcon = Animatable.createAnimatableComponent(Entypo);

@connect((state) => ({
  lastTimeSuggestedDownload: state.lastTimeSuggestedDownload,
}))
export default class SuggestAppDownload extends React.Component {
  constructor(props) {
    super(props);
    this.os = detect().os;
    this.isIOS = detect().os === "iOS";
    this.checklastTimeSuggestedDownload();
  }

  isMobile = () =>
    this.os === "iOS" || this.os.toLowerCase().includes("android");

  checklastTimeSuggestedDownload = async () => {
    if (Platform.OS !== "web" || (Platform.OS === "web" && !this.isMobile())) {
      this.props.navigation.navigate(Screens.CheckUserActivity);
      return;
    }
    if (
      this.props.lastTimeSuggestedDownload &&
      moment().diff(moment(this.props.lastTimeSuggestedDownload), "days") < 5
    ) {
      this.props.navigation.navigate(Screens.CheckUserActivity);
    } else {
      this.props.dispatch(
        ActionsCreators.setLastTimeSuggestedDownload(moment())
      );
    }
  };

  openApp = async () => {
    if (this.isIOS) {
      window.location = "itms-apps://apps.apple.com/us/app/gala/id1449314757";
    } else {
      window.location = "market://details?id=com.gala.galaapp";
    }
  };

  getIcon = () => {
    return this.isIOS ? (
      <IOSAnimatedIcon
        useNativeDriver
        animation="slideInLeft"
        name="ios-appstore"
        size={30}
        color="white"
        style={{marginTop: 10}}
      />
    ) : (
      <AndroidAnimatedIcon
        useNativeDriver
        animation="slideInLeft"
        name="google-play"
        size={30}
        color="white"
        style={{marginTop: 10}}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 30,
          }}
          onPress={() => this.openApp()}
        >
          <Text
            useNativeDriver
            animation="slideInRight"
            style={{
              fontFamily: "lato-bold",
              fontSize: 20,
              color: "white",
            }}
          >
            Bajate la app desde acá
          </Text>

          {this.getIcon()}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(Screens.CheckUserActivity);
            this.props.dispatch(
              ActionsCreators.setLastTimeSuggestedDownload(moment())
            );
          }}
        >
          <Text
            useNativeDriver
            animation="slideInRight"
            style={{
              fontFamily: "lato-bold",
              fontSize: 16,
              color: "white",
            }}
          >
            Continuar con la versión web {"  "} &gt;&gt;
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
