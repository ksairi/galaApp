import React from "react";
import {CommonActions} from "@react-navigation/native";
import {Platform, TouchableOpacity, View, Text} from "react-native";
import {WebView} from "react-native-webview";
import {WebView as WebViewWeb} from "react-native-web-webview";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import {Ionicons} from "@expo/vector-icons";
import ActionsCreators from "redux/actions";
import {SafeAreaView} from "react-native-safe-area-context";
import {genericBackgroundColor} from "components/styles";

@connect((state) => ({
  userData: state.userData,
}))
export default class VideoPlayer extends React.Component {
  state = {showBack: false};

  componentDidMount() {
    this.props.dispatch(ActionsCreators.setHiddenStatusBar(true));
    setTimeout(() => {
      this.setState({showBack: true});
    }, 3000);
  }

  componentWillUnmount() {
    this.props.dispatch(ActionsCreators.setHiddenStatusBar(false));
  }

  render() {
    const {url: uri, backScreen, title} = this.props.route.params;
    return (
      <SafeAreaView style={{backgroundColor: genericBackgroundColor, flex: 1}}>
        {this.state.showBack && (
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
                  this.props.navigation.navigate(backScreen);
                  return;
                }
                this.props.navigation.dispatch(CommonActions.goBack());
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
          {Platform.OS === "web" ? (
            <WebViewWeb source={{uri}} />
          ) : (
            <WebView allowsFullscreenVideo source={{uri}} />
          )}
        </RootWrapper>
      </SafeAreaView>
    );
  }
}
