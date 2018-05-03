import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RkTheme } from 'react-native-ui-kitten'
import Button from '/components/presentationals/Button'
import GenericText from '/components/presentationals/GenericText'
import { connect } from 'react-redux'
import { Screens } from '/config/settings'
import Header from '/components/presentationals/Header' 
import { ActionsCreators } from '/redux/actions'
import RootWrapper from '/components/containers/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import genericStyles from '/config/styles'


RkTheme.setType('RkButton', 'goToLoginButton', {
  backgroundColor: genericStyles.genericButtonBackgroundColor,
  flex:1,
  content:{
    color:'white',
    fontSize:19,
    fontWeight:'bold',  
  }
})

const styles = StyleSheet.create({
  welcome:{
    fontWeight:'bold',
    fontSize:30,
    flex:0,
    color:'white',
    paddingBottom:30
  },

  welcomeDescription: {
    fontSize:20,
    color:'white',
    paddingLeft:40,
    paddingRight:25,
    flex:1,
    fontFamily:'gamja-flower-regular',
  },

  portrait:{
  },
  
  landscape:{
    
  },
})

function goToLogin(dispatch, navigation){
  dispatch(ActionsCreators.setIsAppsFirstTime(false))
  navigation.navigate(Screens.LoginStack)
}

 function Welcome({dispatch, navigation, orientation}){
  return(
    <RootWrapper>
      <CentredWrapper>
        <Header style={{flex:1}}/>
        <GenericText style={styles.welcome}> 
          ¡BIENVENIDO!
        </GenericText>
        <GenericText style={styles.welcomeDescription}>
          Dentro de la app podrás encontrar tus rutinas, clases y todas nuestras novedades para disfrutar aún más tu gimnasio
        </GenericText>
        <View style={{flexDirection:'row', flex:1}}>
          <Button rkType='rounded goToLoginButton' contentStyle={styles[orientation]} text='EXPLORA LA APP' onPress={() => goToLogin(dispatch, navigation)} />
        </View>
      </CentredWrapper>
    </RootWrapper>
  )
}
function mapStateToProps(state){
  return({
    orientation:state.currentOrientation
  })

}
export default connect(mapStateToProps)(Welcome)