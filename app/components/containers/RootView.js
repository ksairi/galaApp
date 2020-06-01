import React from "react";
import {View, Platform} from "react-native";
import {connect} from "react-redux";
import ActionsCreators from "redux/actions";

@connect()
export default class RootView extends React.PureComponent {
  _onLayout = (e) => {
    this.props.dispatch(
      ActionsCreators.setCurrentOrientation(
        e.nativeEvent.layout.height > e.nativeEvent.layout.width ||
          Platform.OS === "web"
          ? "portrait"
          : "landscape"
      )
    );
  };

  render() {
    return (
      <View style={{flex: 1}} onLayout={this._onLayout}>
        {this.props.children}
      </View>
    );
  }
}
