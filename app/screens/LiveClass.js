import React from 'react'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import RootWrapper from '/components/presentationals/RootWrapper'
import { Screens } from '../config/settings'
import API_ACCESS_TOKEN from '/config/apiAccessToken'
import AnalyticsHelper from '/helpers/AnalyticsHelper'
import { AnalitycsEventsLabels } from '/config/settings'
@connect(state => ({
  userData: state.userData
}))
export default class LiveClass extends React.Component {

  componentDidMount () {
    AnalyticsHelper.setEvent(AnalitycsEventsLabels.liveClass)
  }

  onNavigationStateChange = (data) => {
    if (data.url === 'https://galagym.com/') {
      this.props.navigation.navigate(Screens.Home)
    }
  }
  render () {
    const name = this.props.userData && this.props.userData.name
    return (
      <RootWrapper
        style={{
          justifyContent: 'center'
        }}>
        <WebView style={{marginTop: 20}} source={{ uri: `https://galagym.com/free-classes/zoom?name=${name}&hash=${API_ACCESS_TOKEN}` }} onNavigationStateChange={this.onNavigationStateChange} />
      </RootWrapper>
    )
  }
}
