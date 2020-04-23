import React from 'react'
import {Text} from 'react-native'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import RootWrapper from '/components/presentationals/RootWrapper'
import { Screens } from '../config/settings'
import API_ACCESS_TOKEN from '/config/apiAccessToken'
import AnalyticsHelper from '/helpers/AnalyticsHelper'
import { AnalitycsEventsLabels } from '/config/settings'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import styles from 'react-native-carousel-control-fork/styles'

@connect(state => ({
  userData: state.userData
}))
export default class LiveClass extends React.Component {

  styles = {
    title:
      {alignSelf: 'center', color: 'white', fontFamily: 'lato-regular', marginTop: 10}
  }
  state = {
    loading: true
  }

  injectedJs = `
    setTimeout(function () {
      var startAudioButton = document.getElementById('pc-join');
      var startFSButton = document.getElementsByClassName('full-screen-widget ax-outline')[0];
      startFSButton.click();
      startAudioButton.click();
    }, 15000);
      true;
  `

  async componentDidMount () {
    AnalyticsHelper.setEvent(AnalitycsEventsLabels.liveClass)
    setTimeout(() => {
      this.setState({loading: false})
    }, 15000)
    activateKeepAwake()
  }

  componentWillUnmount () {
    deactivateKeepAwake()
  }

  onNavigationStateChange = (data) => {
    if (data.url === 'https://galagym.com/') {
      this.props.navigation.navigate(Screens.Home)
    }
  }
  render () {
    const name = this.props.userData && this.props.userData.name
    const {studio, title} = this.props.navigation.state.params

    return (
      <RootWrapper
        style={{
          justifyContent: 'center'
        }}>
        {this.state.loading && <Text style={styles.title}>
          Cargando...
        </Text>
        }
        <Text style={{alignSelf: 'center', color: 'white', fontFamily: 'lato-regular'}}>
          {title}
        </Text>
        <WebView style={{marginTop: 20}} source={{ uri: `https://galagym.com/live-classes/zoom/${studio}.php?name=${name}&hash=${API_ACCESS_TOKEN}` }} onNavigationStateChange={this.onNavigationStateChange}
          injectedJavaScript={this.injectedJs}
          mediaPlaybackRequiresUserAction={false}
        />
      </RootWrapper>
    )
  }
}
