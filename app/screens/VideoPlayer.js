import React, {Fragment} from 'react'
import { Platform, TouchableOpacity, View, StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import RootWrapper from '/components/presentationals/RootWrapper'
import {Ionicons} from '@expo/vector-icons'
import { ActionsCreators } from '/redux/actions'
@connect(state => ({
  userData: state.userData

}))
export default class LiveClass extends React.Component {

  state = { showBack: false }

  componentDidMount () {
    this.props.dispatch(ActionsCreators.setHiddenStatusBar(true))
    setTimeout(() => {
      this.setState({showBack: true})
    }, 3000)
  }

  render () {
    const {source: uri, backScreen} = this.props.navigation.state.params
    return (
      <Fragment>
        {this.state.showBack && <View style={[{ paddingTop: StatusBar.currentHeight, flex: 0.3, paddingLeft: 10, backgroundColor: Platform.OS === 'ios' ? '#262626' : 'black' }]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(backScreen)}>
            <Ionicons
              name='ios-arrow-round-back'
              size={30}
              color='white'
              style={{
                alignSelf: 'flex-start'
              }}
                  />
          </TouchableOpacity>
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
