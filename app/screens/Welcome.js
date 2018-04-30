import React from 'react'
import { View } from 'react-native'
import { RkTheme, RkText, RkButton } from 'react-native-ui-kitten'
import { connect } from 'react-redux'
import { Screens } from '/config/settings'
import { GenericContainer } from '/components/presentationals/View/'
import ContainerStyles from '/components/presentationals/View/styles'
import Header from '/components/presentationals/Header' 
import { ActionsCreators } from '/redux/actions'
import RootContainer from '/components/presentationals/RootContainer'

const welcomeTextSize=16
    , welcomeTextColor='green'

RkTheme.setType('RkText', 'welcome', {
  fontWeight:'bold',
  fontSize:22,
  paddingBottom:30
})

RkTheme.setType('RkText', 'welcome-description', {
  fontSize:welcomeTextSize,
  color:welcomeTextColor,
  paddingLeft:25,
  paddingRight:25,
  fontFamily:'gamja-flower-regular',
})

RkTheme.setType('RkButton', 'goToLoginButton', {
  backgroundColor: 'red',
  flex:1,
  content:{
    color:'white',
    fontSize:16,
    fontWeight:'bold',  
  }
})


function goToLogin(dispatch, navigation){
  dispatch(ActionsCreators.setIsAppsFirstTime(false))
  navigation.navigate(Screens.LoginStack)
}

 function Welcome({dispatch, navigation}){
  return(
    <RootContainer>
      <GenericContainer style={[ContainerStyles.centredContainer, {flex:1}]}>
        <Header />
        <RkText rkType='welcome'> 
          ¡Bienvenido!
        </RkText>
        <RkText rkType='welcome-description' style={{paddingBottom:40}}>
          Dentro de la app podrás encontrar tus rutinas, clases y todas nuestras novedades para disfrutar aún más tu gimnasio
        </RkText>
        <View style={{flexDirection:'row'}}>
          <RkButton  rkType='rounded goToLoginButton' onPress={() => goToLogin(dispatch, navigation)}>
           EXPLORÁ LA APP
          </RkButton>
        </View>
      </GenericContainer>
    </RootContainer>
  )
}
export default connect()(Welcome)