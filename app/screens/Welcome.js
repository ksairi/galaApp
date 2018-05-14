import React from 'react'
import { View } from 'react-native'
import Button from '/components/presentationals/GenericButton'
import Text from '/components/presentationals/GenericText'
import { connect } from 'react-redux'
import { Screens } from '/config/settings'
import { ActionsCreators } from '/redux/actions'
import RootWrapper from '/components/containers/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import Logo from '/components/presentationals/Logo'

const styles = {
  welcome:{
    fontSize:30,
    flex:0.5,
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

  goToLogin = (dispatch, navigation)=>{
    this.props.dispatch(ActionsCreators.setIsAppsFirstTime(false))
    this.props.navigation.navigate(Screens.LoginStack)
  }

   render(){
      return(
        <RootWrapper style={{marginTop:Expo.Constants.statusBarHeight}}>
          <CentredWrapper>
            <Logo style={{flex:0.9, fontSize:250}}/>
            <View style={{flex:0.95}}>
              <Text style={styles.welcome}>
                ¡BIENVENIDO!
              </Text>
              <Text style={styles.welcomeDescription}>
                Dentro de la app podrás encontrar tus rutinas, clases y todas nuestras novedades para disfrutar aún más tu gimnasio.
              </Text>
            </View>
            <View style={{flexDirection:'row', flex:0.4}}>
              <Button contentStyle={{fontFamily:'brother-1816-bold'}} text='EXPLORÁ LA APP' onPress={() => this.goToLogin()} />
            </View>
          </CentredWrapper>
        </RootWrapper>
      )
  }
}
