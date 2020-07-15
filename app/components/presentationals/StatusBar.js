import React from "react";
import {StatusBar} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Constants from "expo-constants";

export default class MyStatusBar extends React.PureComponent {
  render() {
    if (!this.props.hidden) {
      return (
        <SafeAreaView
          style={{
            height: Constants.statusBarHeight,
            backgroundColor: this.props.backgroundColor,
          }}
        >
          <StatusBar
            translucent
            backgroundColor={this.props.backgroundColor}
            {...this.props}
          />
        </SafeAreaView>
      );
    }
    return null;
  }
}
