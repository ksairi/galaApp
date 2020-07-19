import React, {useState, useCallback} from "react";
import {CommonActions} from "@react-navigation/native";
import {
  Platform,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
} from "react-native";
import {WebView} from "react-native-webview";
import {WebView as WebViewWeb} from "react-native-web-webview";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import {Ionicons} from "@expo/vector-icons";
import ActionsCreators from "redux/actions";
import {SafeAreaView} from "react-native-safe-area-context";
import {genericBackgroundColor} from "components/styles";
import {useFocusEffect} from "@react-navigation/native";

function VideoPlayer({
  dispatch,
  navigation,
  route: {
    params: {url, backScreen, title},
  },
}) {
  const [showBack, setShowBack] = useState(false);
  const [uri, setUri] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(backScreen);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [backScreen])
  );
  useFocusEffect(
    useCallback(() => {
      setUri(url);
      dispatch(ActionsCreators.setHiddenStatusBar(true));
      setTimeout(() => {
        setShowBack(true);
      }, 3000);
      return () => {
        setUri(null);
        dispatch(ActionsCreators.setHiddenStatusBar(false));
        setShowBack(false);
      };
    }, [[url]])
  );

  return (
    <SafeAreaView style={{backgroundColor: genericBackgroundColor, flex: 1}}>
      {showBack && (
        <View
          style={[
            {
              flex: 0.2,
              paddingLeft: 10,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              if (backScreen) {
                navigation.navigate(backScreen);
                return;
              }
              navigation.dispatch(CommonActions.goBack());
            }}
          >
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
        </View>
      )}
      <RootWrapper
        style={{
          justifyContent: "center",
          flex: 2,
          padding: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {Platform.OS === "web"
          ? uri && <WebViewWeb source={{uri}} />
          : uri && <WebView allowsFullscreenVideo source={{uri}} />}
      </RootWrapper>
    </SafeAreaView>
  );
}

export default connect(() => ({}))(VideoPlayer);
