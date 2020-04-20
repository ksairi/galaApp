import React, {Fragment} from 'react'
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
    justifyContent: 'center',
    marginTop: 30
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

  showIntroVideo = (uri) => () => {
    this.props.navigation.navigate(Screens.VideoPlayer, {
      source: {uri},
      backScreen: Screens.Routines
    })
  }

  showTitle = () =>
    <Animatable.View
      useNativeDriver
      animation={'slideInDown'}
      duration={1500}
      style={{
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30
      }}>
      <GenericText style={{ fontSize: 26, fontFamily: 'brother-1816-bold', alignSelf: 'center' }}>
        TUS RUTINAS
      </GenericText>
    </Animatable.View>

  showRoutines = (pRoutines, title) => {
    const routines = pRoutines.map((routine, index) => (
      <Animatable.View
        useNativeDriver
        animation={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
        duration={1500}
        key={index}
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Button
          buttonStyle={{
            backgroundColor: '#12194d',
            flex: 2,
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

        {
          routine.link !== '' && <TouchableOpacity style={{flex: 0.2, marginLeft: 5}} onPress={this.showIntroVideo(routine.link)}>
            <Text style={{fontSize: 13, fontFamily: 'lato-regular', alignSelf: 'center', color: 'white'}}>
              Video
            </Text>

          </TouchableOpacity>
        }
      </Animatable.View>
    ))
    return (
      <View>
        <GenericText
          style={{fontSize: 21, fontFamily: 'lato-regular', paddingBottom: 10}}>{title}</GenericText>
        <View>{routines}</View>
      </View>
    )
  }

  render () {
    const validRoutines = this.props.routines.filter(routine => routine.ejercicios.length)
    const personalRoutines = validRoutines.filter(routine => !routine.generica)
    const generalRoutines = validRoutines.filter(routine => routine.generica)
    return (
      <GScrollView>
        <RootWrapper style={{ padding: 0 }}>
            {this.props.routines.length > 0 ? (
              <Fragment>
                <View style={{alignItems: 'flex-start'}}>
                  {this.showTitle()}
                </View>
                <View style={styles.routinesWrapper}>
                  <View>
                    {this.showRoutines(personalRoutines, 'PERSONALES')}
                  </View>
                  <View style={{marginTop: 60}}>
                    {this.showRoutines(generalRoutines, 'GENERALES')}
                  </View>
                </View>
              </Fragment>
            ) : (
              <View style={{ alignItems: 'center', marginTop: 50 }}>
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
        </RootWrapper>
      </GScrollView>
    )
  }
}
