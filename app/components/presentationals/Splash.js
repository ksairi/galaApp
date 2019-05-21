import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-animatable-promise'

export default class Splash extends React.PureComponent {
  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <Image
          useNativeDriver
          animation='swing'
          iterationCount='infinite'
          duration={2000}
          style={{
            flex: 1,
            resizeMode: 'contain',
            width: undefined,
            height: undefined
          }}
          source={require('../../../assets/splash.png')}
          onLoadEnd={
            this.props.onSplashImageLoad ? this.props.onSplashImageLoad : null
          }
          fadeDuration={0} // adjust Android devices fadeDuration default value is `300`
        />
      </View>
    )
  }
}
