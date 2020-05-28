import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {WebView} from "react-native-webview";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import API_ACCESS_TOKEN from "config/apiAccessToken";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import {AnalitycsEventsLabels} from "config/settings";
import {activateKeepAwake, deactivateKeepAwake} from "expo-keep-awake";
import {Ionicons} from "@expo/vector-icons";
import {genericBackgroundColor} from "components/styles";
import Constants from "expo-constants";

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
      startFSButton.click();
      startAudioButton.click();
    }, 15000);
      true;
  `;

  async componentDidMount() {
    AnalyticsHelper.setEvent(AnalitycsEventsLabels.liveClass);
    setTimeout(() => {
      this.setState({loading: false});
    }, 15000);
    activateKeepAwake();
  }

  componentWillUnmount() {
    deactivateKeepAwake();
  }

  onNavigationStateChange = (data) => {
    if (data.url === "https://galagym.com/") {
      this.props.navigation.goBack();
    }
  };

  getHost = () => {
    const {slug} = Constants.manifest;
    return slug === "galaApp" ? "galagym.com" : "test.galagym.com";
  };

  render() {
    const name = this.props.userData && this.props.userData.name;
    const {studio, title} = this.props.navigation.state.params;

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
              uri: `https://${this.getHost()}/live-classes/zoom/${studio}.php?name=${name}&hash=${API_ACCESS_TOKEN}`,
            }}
            onNavigationStateChange={this.onNavigationStateChange}
            injectedJavaScript={this.injectedJs}
            mediaPlaybackRequiresUserAction={false}
          />
        </RootWrapper>
      </>
    );
  }
}
