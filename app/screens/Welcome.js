import React from 'react'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable-promise'
import Button from '/components/presentationals/GenericButton'
import Text from '/components/presentationals/GenericText'
import { connect } from 'react-redux'
import { Screens } from '/config/settings'
import { ActionsCreators } from '/redux/actions'
import RootWrapper from '/components/presentationals/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import Logo from '/components/presentationals/Logo'
import AnalyticsHelper from '/helpers/AnalyticsHelper'

const AnimatedLogo = Animatable.createAnimatableComponent(Logo)
const AnimatedText = Animatable.createAnimatableComponent(Text)
const AnimatedButton = Animatable.createAnimatableComponent(Button)

const styles = {
  welcome: {
    fontSize: 22,
    flex: 0.7,
    color: 'white',
    fontFamily: 'brother-1816-bold'
  },

  welcomeDescription: {
    fontSize: 20,
    color: 'white',
    paddingRight: 10,
    flex: 1.2,
    fontFamily: 'lato-regular'
  },
  landscapeStyle: {
    logo: {
      marginTop: 20,
      flex: 0.7
    }
  }
}
@connect(state => ({
  orientation: state.currentOrientation
}))
export default class Welcome extends React.PureComponent {
  state = {
    componentsStyle: null
  }
  goToLogin = () => {
    this.props.dispatch(ActionsCreators.setIsAppsFirstTime(false))
    this.props.navigation.navigate(Screens.LoginStack)
  }

  handleAnimatedLogo = ref => (this.animatedLogo = ref)
  handleAnimatedTitle = ref => (this.animatedTitle = ref)
  handleAnimatedBody = ref => (this.animatedBody = ref)
  handleAnimatedButton = ref => (this.animatedButton = ref)

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.orientation) {
      if (nextProps.orientation === 'landscape') {
        return { componentsStyle: styles.landscapeStyle }
      } else {
        return { componentsStyle: {} }
      }
    }
    return prevState
  }

  componentDidMount () {
    AnalyticsHelper.setPageHit(Screens.Welcome)
    const duration = 2000
    this.animatedLogo.bounceInLeft(duration)
    this.animatedTitle.bounceInRight(duration)
    this.animatedBody.bounceInLeft(duration)
    this.animatedButton.bounceInRight(duration)
  }

  render () {
    return (
      <RootWrapper>
        <CentredWrapper>
          <AnimatedLogo
            useNativeDriver
            style={[
              { flex: 0.9, fontSize: 75, marginTop: 50 },
              this.state.componentsStyle.logo
            ]}
            ref={this.handleAnimatedLogo}
          />
          <View style={{ flex: 0.95 }}>
            <AnimatedText
              useNativeDriver
              style={styles.welcome}
              ref={this.handleAnimatedTitle}>
              ¡BIENVENIDO!
            </AnimatedText>
            <AnimatedText
              useNativeDriver
              style={styles.welcomeDescription}
              ref={this.handleAnimatedBody}>
              Dentro de la app podrás encontrar tus rutinas, clases y todas
              nuestras novedades para disfrutar aún más tu gimnasio.
            </AnimatedText>
          </View>
          <View style={{ flexDirection: 'row', flex: 0.4 }}>
            <AnimatedButton
              textStyle={{ fontFamily: 'brother-1816-bold', fontSize: 21 }}
              text='EXPLORÁ LA APP'
              onPress={this.goToLogin}
              ref={this.handleAnimatedButton}
            />
          </View>
        </CentredWrapper>
      </RootWrapper>
    )
  }
}
