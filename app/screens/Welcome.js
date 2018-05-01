import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RkTheme, RkText } from 'react-native-ui-kitten'
import Button from '/components/presentationals/Button'
import { connect } from 'react-redux'
import { Screens } from '/config/settings'
import Header from '/components/presentationals/Header' 
import { ActionsCreators } from '/redux/actions'
import RootWrapper from '/components/containers/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import genericStyles from '/config/styles'

RkTheme.setType('RkText', 'welcome', {
  fontWeight:'bold',
  fontSize:30,
  paddingBottom:30,
  color:'white'
})

RkTheme.setType('RkText', 'welcome-description', {
  fontSize:26,
  color:'white',
  paddingLeft:40,
  paddingRight:25,
  fontFamily:'gamja-flower-regular',
})

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
  portrait:{
  },
  landscape:{
    fontSize:25,
  }
})

function goToLogin(dispatch, navigation){
  dispatch(ActionsCreators.setIsAppsFirstTime(false))
  navigation.navigate(Screens.LoginStack)
}

 function Welcome({dispatch, navigation, orientation}){
  return(
    <RootWrapper>
      <CentredWrapper>
        <Header />
        <RkText rkType='welcome'> 
          ¡Bienvenido!
        </RkText>
        <RkText rkType='welcome-description' style={{paddingBottom:40}}>
          Dentro de la app podrás encontrar tus rutinas, clases y todas nuestras novedades para disfrutar aún más tu gimnasio
        </RkText>
        <View style={{flexDirection:'row', marginTop:90}}>
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