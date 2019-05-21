import React from 'react'
import { AppState } from 'react-native'
import { connect } from 'react-redux'
import GenericText from '/components/presentationals/GenericText'
import RootWrapper from '/components/presentationals/RootWrapper'
import * as UserDataHelper from '/helpers/UserDataHelper'
import { Screens } from '../config/settings'
import * as Animatable from 'react-native-animatable-promise'
import AnalyticsHelper from '/helpers/AnalyticsHelper'

@connect(state => ({
  newMemberData: state.newMemberData
}))
export default class NewMember extends React.Component {
  state = {
    appState: AppState.currentState,
    freeEntryDaysLeft: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.newMemberData) {
      return {
        freeEntryDaysLeft: UserDataHelper.getFreeEntryDaysLeft(
          nextProps.newMemberData.freeEntryData.date
        )
      }
    }
  }

  componentDidMount () {
    AnalyticsHelper.setPageHit(Screens.NewMember)
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const freeEntryDaysLeft = UserDataHelper.getFreeEntryDaysLeft(
        this.props.newMemberData.freeEntryData.date
      )
      if (freeEntryDaysLeft <= 0) {
        this.props.navigation.navigate(Screens.Home)
        return
      }
      this.setState({ freeEntryDaysLeft })
    }
    this.setState({ appState: nextAppState })
  }

  render () {
    return (
      <RootWrapper
        style={{
          justifyContent: 'center'
        }}>
        <Animatable.View animation='zoomIn' userNativeDriver>
          <GenericText
            style={[
              {
                fontFamily: 'lato-regular',
                flex: -1,
                paddingBottom: 10,
                fontSize: 20
              }
            ]}>
            Presentá éste código en recepción y disfrutá un mes gratis!
          </GenericText>
          <GenericText
            style={[
              {
                fontFamily: 'brother-1816-bold',
                flex: -1,
                paddingBottom: 20,
                fontSize: 25
              }
            ]}>
            {this.props.newMemberData.freeEntryData.code}
          </GenericText>
          <GenericText
            style={{ fontFamily: 'lato-regular', fontSize: 18, flex: -1 }}>
            Te quedan
            <GenericText
              style={{
                fontFamily: 'brother-1816-bold',
                fontSize: 18,
                color: this.state.freeEntryDaysLeft > 3 ? 'green' : 'red'
              }}>
              {' '}
              {this.state.freeEntryDaysLeft}{' '}
            </GenericText>
            {this.state.freeEntryDaysLeft > 1 ? 'días ' : 'día '} para
            activarlo!
          </GenericText>
        </Animatable.View>
      </RootWrapper>
    )
  }
}
