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

const AnimatedLogo = Animatable.createAnimatableComponent(Logo)
const AnimatedText = Animatable.createAnimatableComponent(Text)
const AnimatedButton = Animatable.createAnimatableComponent(Button)



const styles = {
  welcome:{
    fontSize:22,
    flex:0.7,
    color:'white',
    fontFamily:'brother-1816-bold'
  },

  welcomeDescription: {
    fontSize:20,
    color:'white',
    paddingRight:10,
    flex:1.2,
    fontFamily:'lato-regular',
  }
}
@connect()
export default class Welcome extends React.PureComponent{

  goToLogin = () => {
    this.props.dispatch(ActionsCreators.setIsAppsFirstTime(false))
    this.props.navigation.navigate(Screens.LoginStack)
  }

  handleAnimatedLogo = ref => this.animatedLogo = ref
  handleAnimatedTitle = ref => this.animatedTitle = ref
  handleAnimatedBody = ref => this.animatedBody = ref
  handleAnimatedButton = ref => this.animatedButton = ref

  componentDidMount(){
    const duration = 2000
    this.animatedLogo.bounceInLeft(duration)
    this.animatedTitle.bounceInRight(duration)
    this.animatedBody.bounceInLeft(duration)
    this.animatedButton.bounceInRight(duration)
  }

   render(){
      return(
        <RootWrapper style={{marginTop:Expo.Constants.statusBarHeight}}>
          <CentredWrapper>
            <AnimatedLogo style={{flex:0.9, fontSize:80, marginTop:50}} ref={this.handleAnimatedLogo}/>
            <View style={{flex:0.95}}>
              <AnimatedText style={styles.welcome} ref={this.handleAnimatedTitle}>
                ¡BIENVENIDO!
              </AnimatedText>
              <AnimatedText style={styles.welcomeDescription} ref={this.handleAnimatedBody}>
                Dentro de la app podrás encontrar tus rutinas, clases y todas nuestras novedades para disfrutar aún más tu gimnasio.
              </AnimatedText>
            </View>
            <View style={{flexDirection:'row', flex:0.4}}>
              <AnimatedButton contentStyle={{fontFamily:'brother-1816-bold'}} text='EXPLORÁ LA APP' onPress={this.goToLogin} ref={this.handleAnimatedButton}/>
            </View>
          </CentredWrapper>
        </RootWrapper>
      )
  }
}
