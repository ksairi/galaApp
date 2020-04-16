import React from 'react'
import { View, TouchableOpacity, BackHandler } from 'react-native'
import GScrollView from '/components/presentationals/GenericScrollView'
import { connect } from 'react-redux'
import Timeline from 'react-native-timeline-listview'
import RootWrapper from '/components/presentationals/RootWrapper'
import Icon from '/helpers/ImageHelper'
import GenericText from '/components/presentationals/GenericText'
import { Screens } from '/config/settings'
import { ActionsCreators } from '/redux/actions'
import { genericBackgroundColor } from '/components/styles'
import { FontAwesome } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable-promise'
import AnalyticsHelper from '/helpers/AnalyticsHelper'

const styles = {
  exerciseDetail: {
    fontFamily: 'brother-1816-bold',
    fontSize: 11.5,
    textAlign: 'left',
    flex: -1,
    paddingRight: 2
  },
  exerciseDetailLabel: {
    color: 'grey'
  },
  exerciseDetailValue: {
    color: 'black'
  },

  exerciseDetailWrapper: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  }
}
const AnimatedWrapper = Animatable.createAnimatableComponent(RootWrapper)

@connect(state => ({
  currentRoutine: state.currentRoutine
}))
export default class RoutineDetail extends React.Component {
  state = {}

  componentDidMount () {
    AnalyticsHelper.setPageHit(Screens.RoutineDetail)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    this.props.dispatch(ActionsCreators.setCurrentRoutine(''))
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.currentRoutine) {
      return {
        routineData: RoutineDetail.getRoutineFormattedData(
          nextProps.currentRoutine
        )
      }
    }
    return prevState
  }

  static getRoutineFormattedData (routine) {
    const result = []
    routine && routine.ejercicios.forEach((exercise, index) => {
      const exerciseData = {}
      exerciseData.time = index + 1
      exerciseData.title = exercise.name.toUpperCase()
      exerciseData.description = exercise.descripcion
      exerciseData.repetitions = exercise.repetitions
      exerciseData.minutes = exercise.minutes
      exerciseData.series = exercise.series
      exerciseData.type = exercise.type
      exerciseData.recovery = exercise.recuperacion
      exerciseData.link = exercise.link
      result.push(exerciseData)
    })
    return result
  }

  handleBackPress = () => {
    this.goBackToRoutines()
    return true
  }

  goBackToRoutines = () => {
    this.props.navigation.navigate(Screens.Routines)
  }

  showVideo = (uri) => () => {
    this.props.navigation.navigate(Screens.VideoPlayer, {
      source: {uri},
      backScreen: Screens.RoutineDetail
    })
  }

  renderTimeLineDetail = rowData => {
    let title = (
      <View style={{ flexDirection: 'row' }}>
        <GenericText
          style={{
            color: 'black',
            fontFamily: 'brother-1816-bold',
            fontSize: 16,
            textAlign: 'left'
          }}>
          {rowData.title}
        </GenericText>
        {rowData.link !== null && <TouchableOpacity onPress={this.showVideo(rowData.link)}>
          <GenericText
            style={{
              color: 'black',
              fontFamily: 'lato-regular',
              fontSize: 13,
              marginRight: 15
            }}>
            Ver Video
          </GenericText>
        </TouchableOpacity>
        }
      </View>
    )
    var desc = null
    var recovery = null

    desc = (
      <GenericText
        style={{
          color: 'black',
          fontFamily: 'lato-regular',
          textAlign: 'left'
        }}>
        {rowData.description}
      </GenericText>
    )

    recovery = (
      <GenericText
        style={{
          color: 'black',
          fontFamily: 'lato-regular',
          textAlign: 'left',
          marginTop: 10
        }}>
        Recuperación: {rowData.recovery} segundos
      </GenericText>
    )

    const exerciseDetails = rowData.minutes ? (
      <View style={styles.exerciseDetailWrapper}>
        <Icon
          name='timer-routines-detail'
          size={20}
          style={{ paddingRight: 7 }}
        />
        <View style={{ marginTop: 3, flex: -1, flexDirection: 'row' }}>
          <GenericText
            style={[styles.exerciseDetail, styles.exerciseDetailValue]}>
            {rowData.minutes}
          </GenericText>
          <GenericText
            style={[styles.exerciseDetail, styles.exerciseDetailLabel]}>
            {rowData.minutes > 1 ? 'MINUTOS' : 'MINUTO'}
          </GenericText>
        </View>
      </View>
    ) : (
      <View style={styles.exerciseDetailWrapper}>
        <GenericText
          style={[styles.exerciseDetail, styles.exerciseDetailValue]}>
          {rowData.series}
        </GenericText>
        <GenericText
          style={[styles.exerciseDetail, styles.exerciseDetailLabel]}>
          {rowData.series > 1 ? 'SERIES' : 'SERIE'}
        </GenericText>
        <FontAwesome
          name='repeat'
          style={{
            fontSize: 20,
            paddingLeft: 5,
            paddingRight: 3,
            color: 'black'
          }}
        />
        <GenericText
          style={[
            styles.exerciseDetail,
            styles.exerciseDetailValue,
            { paddingLeft: 2 }
          ]}>
          {rowData.repetitions}
        </GenericText>
        <GenericText
          style={[styles.exerciseDetail, styles.exerciseDetailLabel]}>
          {rowData.repetitions > 1 ? 'REPETICIONES' : 'REPETICIÓN'}
        </GenericText>
      </View>
    )

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start'
        }}>
        {title}
        {exerciseDetails}
        {desc}
        {rowData.recovery && recovery}
      </View>
    )
  }
  render () {
    return (
      <AnimatedWrapper
        useNativeDriver
        animation='zoomIn'
        style={{ backgroundColor: 'black', paddingLeft: 5 }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', height: 30, marginTop: 5 }}>
          <TouchableOpacity onPress={this.goBackToRoutines}>
            <Icon
              name='arrow-navigation-white-left'
              style={{ fontSize: 25, color: 'white', marginLeft: 15 }}
            />
          </TouchableOpacity>
          <GenericText
            style={{
              fontFamily: 'brother-1816-bold',
              fontSize: 17,
              marginTop: 2
            }}>
            {this.props.currentRoutine.description.toUpperCase()}
          </GenericText>
        </View>
        <GScrollView
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingLeft: 10,
            paddingRight: 3
          }}
          containerStyle={{marginLeft: 10, marginTop: 5}}>
          <Timeline
            style={{ marginTop: 20 }}
            circleSize={20}
            circleColor={genericBackgroundColor}
            innerCircle='dot'
            lineWidth={5}
            lineColor={genericBackgroundColor}
            timeContainerStyle={{ minWidth: 52 }}
            timeStyle={{
              textAlign: 'center',
              backgroundColor: genericBackgroundColor,
              color: 'white',
              padding: 5,
              borderRadius: 13,
              fontFamily: 'brother-1816-bold'
            }}
            separatorStyle={{ backgroundColor: 'grey' }}
            separator
            renderFullLine={false}
            data={this.state.routineData}
            renderDetail={this.renderTimeLineDetail}
            detailContainerStyle={{ marginLeft: -5 }}
          />
        </GScrollView>
      </AnimatedWrapper>
    )
  }
}
