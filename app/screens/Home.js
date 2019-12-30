import React from 'react'
import { View, TouchableOpacity, AppState, Text } from 'react-native'
import { connect } from 'react-redux'
import GScrollView from '/components/presentationals/GenericScrollView'
import RootWrapper from '/components/presentationals/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import { ActionsCreators } from '/redux/actions'
import { Screens, SectionsData } from '/config/settings'
import Icon from '/helpers/ImageHelper'
import GenericText from '/components/presentationals/GenericText'
import Footer from '/components/presentationals/Footer'
import { FontAwesome } from '@expo/vector-icons'
import * as UserDataHelper from '/helpers/UserDataHelper'
import * as Animatable from 'react-native-animatable-promise'
import AnalyticsHelper from '/helpers/AnalyticsHelper'
import ImageSlider from '/components/presentationals/ImageSlider'
import { genericBackgroundColor } from '/components/styles'
import {TimetableItem} from '/components/presentationals/TimetableItem'
import {RoutineItem} from '/components/presentationals/RoutineItem'

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
  },
  imageContainer: {
    marginTop: 20,
    flex: -1
  },
  promotionsContainer: {
    marginTop: 30,
    marginBottom: 60,
    marginLeft: 20,
    marginRight: 20,
    flex: 1
  },
  sliderTitleWrapper: {
    width: 360,
    height: 520
  },
  title: {
    width: 225,
    height: 24,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff'
  },
  link: {
    width: 119,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: '#00ffb4'
  }
}

const AnimatedTimetableSlider = Animatable.createAnimatableComponent(ImageSlider)
const AnimatedRoutinesSlider = Animatable.createAnimatableComponent(ImageSlider)

@connect(state => ({
  userData: state.userData,
  currentHomeDrawerOption: state.currentHomeDrawerOption,
  newMemberData: state.newMemberData,
  routines: state.routines,
  timetable: state.timetable
}))
export default class Home extends React.Component {
  state = {
    appState: AppState.currentState,
    timetableSliderImages: [],
    routinesSliderImages: []
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

  loadTimetableSliderImages = () => {
    var timetableSliderImages = []
    for (let i = 0; i < 5; i++) {
      timetableSliderImages.push(require(`../assets/images/timetable-image-${i}.jpg`))
    }
    this.setState(timetableSliderImages)
  }

  loadRoutinesSliderImages = () => {
    var routinesSliderImages = []
    for (let i = 0; i < 5; i++) {
      routinesSliderImages.push(require(`../assets/images/routine-image-${i}.jpg`))
    }
    this.setState(routinesSliderImages)
  }

  componentDidMount () {
    AnalyticsHelper.setPageHit(Screens.Home)
    AppState.addEventListener('change', this._handleAppStateChange)
    if (this.props.currentHomeDrawerOption !== '') {
      this.props.navigation.navigate(this.props.currentHomeDrawerOption)
      this.props.dispatch(ActionsCreators.setCurrentHomeDrawerOption(''))
    }
    this.loadTimetableSliderImages()
    this.loadRoutinesSliderImages()
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  onIconPressed = screen => () => {
    this.props.navigation.navigate(screen)
  }
  goToScreen = (screen) => () => { this.props.navigation.navigate(screen) }

  render () {
    return (
      <GScrollView>
        <RootWrapper style={{ padding: 0 }}>
          <CentredWrapper>
            <View style={styles.imageContainer}>
              <View style={styles.sliderTitleWrapper}>
                <Text style={styles.title}>Próximas clases</Text>
                <TouchableOpacity onPress={this.goToScreen(Screens.Timetable)}
                  style={styles.link}>Ver cronograma ></TouchableOpacity>
              </View>
              <AnimatedTimetableSlider
                useNativeDriver
                animation={"zoomIn"}
                images={this.state.timetableSliderImages}
                style={{ backgroundColor: genericBackgroundColor }}
                Component={TimetableItem}
                arrayData={this.props.timetable}
              />
            </View>
            <View style={styles.imageContainer}>
              <View style={styles.sliderTitleWrapper}>
                <Text style={styles.title}>Mi rutina</Text>
                <TouchableOpacity onPress={this.goToScreen(Screens.Routines)} style={styles.link}>Empezar ></TouchableOpacity>
              </View>
              <AnimatedRoutinesSlider
                useNativeDriver
                animation={"zoomIn"}
                images={this.state.routinesSliderImages}
                style={{ backgroundColor: genericBackgroundColor }}
                Component={RoutineItem}
                arrayData={this.props.routines}
              />
            </View>
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
        </RootWrapper>
      </GScrollView>
    )
  }
}
