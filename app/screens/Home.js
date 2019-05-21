import React from 'react'
import { View, TouchableOpacity, AppState } from 'react-native'
import { connect } from 'react-redux'
import GScrollView from '/components/presentationals/GenericScrollView'
import RootWrapper from '/components/presentationals/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import { ActionsCreators } from '/redux/actions'
import { Screens, SectionsData } from '/config/settings'
import Icon from '/helpers/ImageHelper'
import GenericText from '/components/presentationals/GenericText'
import Footer from '/components/presentationals/Footer'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
import { FontAwesome } from '@expo/vector-icons'
import * as UserDataHelper from '/helpers/UserDataHelper'
import * as Animatable from 'react-native-animatable-promise'
import AnalyticsHelper from '/helpers/AnalyticsHelper'

const styles = {

  buttonsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonWrapper: {
    flex: 1.5,
    backgroundColor: '#12194d',
    justifyContent: 'center',
    padding: 5,
    marginRight: 10,
    marginTop: 10,
    width: 100
  },
  label: {
    flex: -1,
    fontSize: 10,
    fontFamily: 'brother-1816-bold',
    marginTop: 5
  }
}

@connect(state => ({
  userData: state.userData,
  isUsingCache: state.isUsingCache,
  currentHomeDrawerOption: state.currentHomeDrawerOption,
  mainMenuImages: state.mainMenuImages,
  newMemberData: state.newMemberData,
  isDownloadingRemoteImages: state.isDownloadingRemoteImages
}))
export default class Home extends React.Component {
  state = {
    appState: AppState.currentState
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.newMemberData) {
      return {
        freeEntryDaysLeft: UserDataHelper.getFreeEntryDaysLeft(
          nextProps.newMemberData.freeEntryData.date
        )
      }
    }
    return prevState
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (this.props.newMemberData) {
        const freeEntryDaysLeft = UserDataHelper.getFreeEntryDaysLeft(
          this.props.newMemberData.freeEntryData.date
        )
        this.setState({
          freeEntryDaysLeft
        })
      }
    }
    this.setState({ appState: nextAppState })
  }

  componentDidMount () {
    AnalyticsHelper.setPageHit(Screens.Home)
    AppState.addEventListener('change', this._handleAppStateChange)
    if (this.props.currentHomeDrawerOption !== '') {
      this.props.navigation.navigate(this.props.currentHomeDrawerOption)
      this.props.dispatch(ActionsCreators.setCurrentHomeDrawerOption(''))
    }
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  onIconPressed = screen => () => {
    this.props.navigation.navigate(screen)
  }

  render () {
    return (
      <GScrollView>
        <RootWrapper style={{ padding: 0 }}>
          {!this.props.isDownloadingRemoteImages ? (
            <CentredWrapper>
              <Animatable.View
                useNativeDriver
                animation={'slideInRight'}
                style={styles.buttonsContainer}>
                {SectionsData.map((sectionData, index) => {
                  if (
                    sectionData.screen !== Screens.NewMember ||
                    (sectionData.screen === Screens.NewMember &&
                      this.state.freeEntryDaysLeft &&
                      this.state.freeEntryDaysLeft > 0)
                  ) {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={this.onIconPressed(sectionData.screen)}>
                        <View style={styles.buttonWrapper}>
                          <View
                            style={{
                              alignItems: 'center'
                            }}>
                            {sectionData.otherIcon ? (
                              <FontAwesome
                                name={sectionData.icon}
                                style={sectionData.homeStyle}
                              />
                            ) : (
                              <Icon
                                name={sectionData.icon}
                                style={sectionData.homeStyle}
                              />
                            )}
                            <GenericText style={styles.label}>
                              {sectionData.label}
                            </GenericText>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                })}
              </Animatable.View>
              <Footer />
            </CentredWrapper>
          ) : (
            <LoadingSpinner visible message={'Cargando'} />
          )}
        </RootWrapper>
      </GScrollView>
    )
  }
}
