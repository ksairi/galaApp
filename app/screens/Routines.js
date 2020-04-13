import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import GScrollView from '/components/presentationals/GenericScrollView'
import Button from '/components/presentationals/GenericButton'
import { connect } from 'react-redux'
import RootWrapper from '/components/presentationals/RootWrapper'
import GenericText from '/components/presentationals/GenericText'
import { Screens } from '/config/settings'
import { ActionsCreators } from '/redux/actions'
import * as Animatable from 'react-native-animatable-promise'
import AnalyticsHelper from '/helpers/AnalyticsHelper'

const styles = {
  routinesWrapper: {
    flex: 1,
    justifyContent: 'center'
  }
}

@connect(state => ({
  routines: state.routines
}))
export default class Routines extends React.Component {

  state = {
    videoUrl: null
  }

  componentDidMount () {
    AnalyticsHelper.setPageHit(Screens.Routines)
  }

  seeRoutine = routine => () => {
    this.props.dispatch(ActionsCreators.setCurrentRoutine(routine))
    this.props.navigation.navigate(Screens.RoutineDetail)
  }

  showIntroVideo = (videoUrl) => () => {
    this.props.navigation.navigate(Screens.VideoPlayer, {
      source: {uri: 'https://galagym.com/routines-videos/big_buck_bunny.mp4'},
      backScreen: Screens.Routines
    })
  }

  showRoutines = () => {
    const title =
      <Animatable.View
        useNativeDriver
        animation={'slideInDown'}
        duration={1500}
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 15
        }}>
        <GenericText style={{ fontSize: 26, fontFamily: 'brother-1816-bold' }}>
          TUS RUTINAS
        </GenericText>
      </Animatable.View>

    const routines = this.props.routines.map((routine, index) => (
      <Animatable.View
        useNativeDriver
        animation={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
        duration={1500}
        key={index}
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 15
        }}>
        <Button
          buttonStyle={{
            backgroundColor: '#12194d',
            flex: 1,
            paddingLeft: 10,
            justifyContent: 'flex-start',
            height: 60
          }}
          textStyle={{
            fontSize: 20,
            fontFamily: 'brother-1816-bold'
          }}
          onPress={this.seeRoutine(routine)}
          text={routine.description.toUpperCase()}
        />

        <TouchableOpacity onPress={this.showIntroVideo(routine.videoUrl)}>
          <Text style={{fontSize: 14, fontFamily: 'lato-regular', marginTop: 10, alignSelf: 'center', color: 'white'}}>
            Ver intro
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    ))
    return (
      <View>
        {title}
        {routines}
      </View>
    )
  }

  render () {
    return (
      <GScrollView>
        <RootWrapper style={{ padding: 0 }}>
          <View style={styles.routinesWrapper}>
            {this.props.routines.length > 0 ? (
              this.showRoutines()
            ) : (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <GenericText
                  style={{ fontFamily: 'brother-1816-bold', fontSize: 22 }}>
                  ¡Ups!
                </GenericText>
                <GenericText style={{ fontSize: 18 }}>
                  Todavía no tienes rutinas
                </GenericText>
                <GenericText style={{ fontSize: 18 }}>disponibles</GenericText>
              </View>
            )}
          </View>
        </RootWrapper>
      </GScrollView>
    )
  }
}
