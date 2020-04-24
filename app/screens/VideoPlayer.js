import React, {Fragment} from 'react'
import { Platform, TouchableOpacity, View, StatusBar, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import RootWrapper from '/components/presentationals/RootWrapper'
import {Ionicons} from '@expo/vector-icons'
import { ActionsCreators } from '/redux/actions'
import AnalyticsHelper from '/helpers/AnalyticsHelper'
import { AnalitycsEventsLabels } from '/config/settings'

@connect(state => ({
  userData: state.userData

}))
export default class VideoPlayer extends React.Component {

  state = { showBack: false }

  componentDidMount () {
    AnalyticsHelper.setEvent(AnalitycsEventsLabels.videoPlayer)
    this.props.dispatch(ActionsCreators.setHiddenStatusBar(true))
    setTimeout(() => {
      this.setState({showBack: true})
    }, 3000)
  }

  componentWillUnmount () {
    this.props.dispatch(ActionsCreators.setHiddenStatusBar(false))
  }

  render () {
    const {url:uri, backScreen, title} = this.props.navigation.state.params
    return (
      <Fragment>
        {this.state.showBack && <View style={[{ paddingTop: StatusBar.currentHeight, flex: 0.3, paddingLeft: 10, backgroundColor: Platform.OS === 'ios' ? '#262626' : 'black' }]}>
          <TouchableOpacity onPress={() => backScreen ? this.props.navigation.navigate(backScreen) : this.props.navigation.goBack()}>
            <Ionicons
              name='ios-arrow-round-back'
              size={30}
              color='white'
              style={{
                alignSelf: 'flex-start'
              }}
            />
          </TouchableOpacity>
          <Text style={{alignSelf: 'center', color: 'white', fontFamily: 'lato-regular'}}>
            {title}
          </Text>
        </View>
        }
        <RootWrapper
          style={{
            justifyContent: 'center',
            flex: 2,
            padding: 0,
            paddingTop: 0,
            paddingBottom: 0
          }}>
          <WebView allowsFullscreenVideo source={{uri}} />
        </RootWrapper>
      </Fragment>
    )
  }
}
