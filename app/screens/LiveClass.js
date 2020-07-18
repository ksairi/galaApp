import React, {useEffect, useState, useCallback} from "react";
import {Text, TouchableOpacity, Platform, Linking} from "react-native";
import {WebView} from "react-native-webview";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import API_ACCESS_TOKEN from "config/apiAccessToken";
import {AnalitycsEventsLabels, Messages, Screens} from "config/settings";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import * as ApiHelper from "helpers/ApiHelper";
import {activateKeepAwake, deactivateKeepAwake} from "expo-keep-awake";
import {Ionicons} from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import {detect} from "detect-browser";
import Alert from "components/presentationals/Alert";
import * as withEnv from "utils/env";

const styles = {
  title: {
    alignSelf: "center",
    color: "white",
    fontFamily: "lato-regular",
  },
};

function LiveClass({navigation, route, userData}) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState(null);
  const [uri, setUri] = useState(null);
  const [hasLeft, setHastLeft] = useState(false);

  const goBack = useCallback(() => {
    navigation.navigate(Screens.Home);
  });

  const getMeetingId = useCallback(async (studioNumber) =>
    ApiHelper.getMeetingId({studioNumber})
  );

  const openAppIfNeeded = useCallback(async (name, studioNumber, uri) => {
    try {
      if (Platform.OS === "ios") {
        const {meetingId} = await getMeetingId(studioNumber);
        const link = `zoomus://zoom.us/join?confno=${meetingId}&&zc=0&browser=safari&uname=${name}`;
        try {
          await Linking.openURL(link);
          goBack();
        } catch (e) {
          setMessage("Por favor descargue la app Zoom");
        }
      }
      if (Platform.OS === "web") {
        const browser = detect().name;
        if (browser === "chrome" || browser === "edge") {
          if (uri) {
            window.open(uri, "_blank");
          }
        } else {
          const {meetingId} = await getMeetingId(studioNumber);
          window.open(`https://zoom.us/j/${meetingId}`, "_blank");
        }
        goBack();
      }
    } catch (e) {
      setMessage(Messages.SERVER_ERROR);
    }
  }, []);

  useEffect(() => {
    const askAndroidPermissions = async () => {
      if (Platform.OS === "android") {
        await Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.AUDIO_RECORDING
        );
        setTimeout(() => {
          setLoading(false);
        }, 15000);
        activateKeepAwake();
      }
    };
    navigation.addListener("focus", () => {
      setLoading(true);
      setMessage(null);
      setHastLeft(false);
      askAndroidPermissions();
      AnalyticsHelper.setEvent(AnalitycsEventsLabels.liveClass);
      const {studioNumber} = route.params.params;
      const name = userData?.name;
      const uri = `${withEnv.getHost()}/live-classes/zoom/studio${studioNumber}.php?name=${name}&hash=${API_ACCESS_TOKEN}`;
      openAppIfNeeded(name, studioNumber, uri);
      setUri(uri);
      const {title} = route.params.params;
      setTitle(title);
    });
    navigation.addListener("blur", () => {
      setLoading(false);
      setHastLeft(true);
      deactivateKeepAwake();
    });
  }, []);

  const injectedJs = `
    setTimeout(function () {
      var startAudioButton = document.getElementById('pc-join');
      var startFSButton = document.getElementsByClassName('full-screen-widget ax-outline')[0];
      if(startFSButton.attributes["aria-label"].value.includes('Enter')){
        startFSButton.click();
      }
      startAudioButton.click();
    }, 15000);

    setTimeout(function () {
      if(gError) {
        window.ReactNativeWebView.postMessage(JSON.stringify({status: "error"}));
      }
    }, 1000);
    true;
  `;

  const onMessage = ({nativeEvent}) => {
    if (!hasLeft) {
      try {
        const result = JSON.parse(nativeEvent.data);
        if (result.status === "error") {
          setMessage("La clase no ha empezado aun");
        }
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  };
  return (
    <RootWrapper
      style={{
        justifyContent: "center",
        paddingTop: 5,
      }}
    >
      {loading ? (
        <Text style={styles.title}>Cargando...</Text>
      ) : (
        <>
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons
              name="ios-arrow-round-back"
              size={30}
              color="white"
              style={{
                alignSelf: "flex-start",
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontFamily: "lato-regular",
            }}
          >
            {title}
          </Text>
        </>
      )}

      {!hasLeft && uri && Platform.OS === "android" && (
        <WebView
          style={{marginTop: 10}}
          source={{
            uri: encodeURI(uri),
          }}
          onMessage={onMessage}
          injectedJavaScript={injectedJs}
          mediaPlaybackRequiresUserAction={false}
        />
      )}
      {!hasLeft && (
        <Alert
          show={!!message}
          message={message}
          showCancelButton={false}
          onConfirmPressed={() => {
            setMessage(null);
            goBack();
          }}
        />
      )}
    </RootWrapper>
  );
}

export default connect((state) => ({
  userData: state.userData,
}))(LiveClass);
