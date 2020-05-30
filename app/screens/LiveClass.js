import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from "react-native";
import {WebView} from "react-native-webview";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import API_ACCESS_TOKEN from "config/apiAccessToken";
import {Screens, AnalitycsEventsLabels} from "config/settings";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import * as ApiHelper from "helpers/ApiHelper";
import {activateKeepAwake, deactivateKeepAwake} from "expo-keep-awake";
import {Ionicons} from "@expo/vector-icons";
import {genericBackgroundColor} from "components/styles";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const styles = {
  title: {
    alignSelf: "center",
    color: "white",
    fontFamily: "lato-regular",
    marginTop: 10,
  },
};

@connect((state) => ({
  userData: state.userData,
}))
export default class LiveClass extends React.Component {
  state = {
    loading: true,
  };

  injectedJs = `
    setTimeout(function () {
      var startAudioButton = document.getElementById('pc-join');
      var startFSButton = document.getElementsByClassName('full-screen-widget ax-outline')[0];
      if(startFSButton.attributes["aria-label"].value.includes('Enter')){
        startFSButton.click();
      }
      startAudioButton.click();
    }, 15000);
    true;
  `;

  async componentDidMount() {
    AnalyticsHelper.setEvent(AnalitycsEventsLabels.liveClass);
    if (Platform.OS === "android") {
      await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.AUDIO_RECORDING
      );
      setTimeout(() => {
        this.setState({loading: false});
      }, 15000);
      activateKeepAwake();
    }
  }

  componentWillUnmount() {
    deactivateKeepAwake();
  }

  onMessage = ({nativeEvent}) => {
    try {
      const result = JSON.parse(nativeEvent.data);
      if (result.errorMessage) {
        this.props.navigation.goBack();
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  onNavigationStateChange = (data) => {
    if (data.url === "https://galagym.com/") {
      this.props.navigation.goBack();
    }
  };

  getHost = () => {
    const {slug} = Constants.manifest;
    return slug === "galaApp" ? "galagym.com" : "test.galagym.com";
  };

  getMeetingId = (studioNumber) => ApiHelper.getMeetingId({studioNumber});

  openAppIfNeeded = async (studioNumber, name) => {
    if (Platform.OS === "ios") {
      const {meetingId} = await this.getMeetingId(studioNumber);
      const link = `zoomus://zoom.us/join?confno=${meetingId}&&zc=0&browser=safari&uname=${name}`;
      try {
        this.props.navigation.navigate(Screens.Home);
        await Linking.openURL(link);
      } catch (e) {
        Alert.alert("Por favor descargue la app Zoom");
      }
    }
    if (Platform.OS === "web") {
      const {meetingId} = await this.getMeetingId(studioNumber);
      this.props.navigation.navigate(Screens.Home);
      window.open(`https://zoom.us/j/${meetingId}`, "_blank");
    }
  };

  render() {
    const name = this.props.userData && this.props.userData.name;
    const {studioNumber, title} = this.props.navigation.state.params;
    this.openAppIfNeeded(studioNumber, name);
    const uri = `https://${this.getHost()}/live-classes/zoom/studio${studioNumber}.php?name=${name}&hash=${API_ACCESS_TOKEN}`;

    return (
      <>
        <View
          style={{
            flex: 0.07,
            paddingLeft: 10,
            backgroundColor: genericBackgroundColor,
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons
              name="ios-arrow-round-back"
              size={30}
              color="white"
              style={{
                alignSelf: "flex-start",
              }}
            />
          </TouchableOpacity>
        </View>
        <RootWrapper
          style={{
            flex: 2,
            justifyContent: "center",
          }}
        >
          {this.state.loading && <Text style={styles.title}>Cargando...</Text>}
          <Text
            style={{
              marginTop: 10,
              alignSelf: "center",
              color: "white",
              fontFamily: "lato-regular",
            }}
          >
            {title}
          </Text>
          <WebView
            style={{marginTop: 10}}
            source={{
              uri,
            }}
            onMessage={this.onMessage}
            onNavigationStateChange={this.onNavigationStateChange}
            injectedJavaScript={this.injectedJs}
            mediaPlaybackRequiresUserAction={false}
          />
        </RootWrapper>
      </>
    );
  }
}
