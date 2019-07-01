import React from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { SafeAreaView } from 'react-navigation'

export default class MyStatusBar extends React.PureComponent {
  render () {
    if (!this.props.hidden) {
      if (Platform.OS === 'ios') {
        return (
          <SafeAreaView
            style={[
              { height: 0 },
              { backgroundColor: this.props.backgroundColor }
            ]}>
            <StatusBar
              translucent
              backgroundColor={this.props.backgroundColor}
              {...this.props}
            />
          </SafeAreaView>
        )
      } else {
        return (
          <View
            style={[
              { height: Expo.Constants.statusBarHeight },
              { backgroundColor: this.props.backgroundColor }
            ]}>
            <StatusBar
              translucent
              backgroundColor={this.props.backgroundColor}
              {...this.props}
            />
          </View>
        )
      }
    } else {
      return null
    }
  }
}
