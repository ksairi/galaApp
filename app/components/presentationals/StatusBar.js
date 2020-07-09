import React from "react";
import {View, StatusBar, Platform} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Constants from "expo-constants";

export default class MyStatusBar extends React.PureComponent {
  render() {
    if (!this.props.hidden) {
      if (Platform.OS === "ios") {
        return (
          <SafeAreaProvider
            style={[{height: 0}, {backgroundColor: this.props.backgroundColor}]}
          >
            <StatusBar
              translucent
              backgroundColor={this.props.backgroundColor}
              {...this.props}
            />
          </SafeAreaProvider>
        );
      }
      return (
        <View
          style={[
            {height: Constants.statusBarHeight},
            {backgroundColor: this.props.backgroundColor},
          ]}
        >
          <StatusBar
            translucent
            backgroundColor={this.props.backgroundColor}
            {...this.props}
          />
        </View>
      );
    }
    return null;
  }
}
