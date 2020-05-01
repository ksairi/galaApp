import React from "react";
import {Platform, TouchableOpacity, View, Text} from "react-native";
import {WebView} from "react-native-webview";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import {Ionicons} from "@expo/vector-icons";
import ActionsCreators from "redux/actions";

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
    const {url: uri, backScreen, title} = this.props.navigation.state.params;
    return (
      <>
        {this.state.showBack && (
          <View
            style={[
              {
                flex: 0.3,
                paddingLeft: 10,
                backgroundColor: Platform.OS === "ios" ? "#262626" : "black",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                backScreen
                  ? this.props.navigation.navigate(backScreen)
                  : this.props.navigation.goBack()
              }
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
          <WebView allowsFullscreenVideo source={{uri}} />
        </RootWrapper>
      </>
    );
  }
}
