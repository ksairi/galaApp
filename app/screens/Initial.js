import React from 'react'
import { View } from 'react-native'
import { RkTheme, RkText, RkButton } from 'react-native-ui-kitten'
import { GenericContainer } from '/components/presentationals/View/'
import ContainerStyles from '/components/presentationals/View/styles'
import Header from '/components/presentationals/Header' 
import { Screens } from '/config/settings'

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
  paddingRight:25
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


function goToLogin(navigation){
  
  navigation.navigate(Screens.SignIn)
}

export default (props)=>
  <GenericContainer style={ContainerStyles.rootContainer}>
    <GenericContainer style={ContainerStyles.centredContainer}>
      <Header />
      <RkText rkType='welcome'> 
        ¡Bienvenido!
      </RkText>
      <RkText rkType='welcome-description'>
        Dentro de la app vas podrás encontrar tus rutinas, clases y todas nuestras novedades para disfrutar aún más
      </RkText>
      <RkText style={{fontSize:welcomeTextSize, color:welcomeTextColor, paddingBottom:40}}>tu gimnasio</RkText>
      
      <View style={{flexDirection:'row'}}>
        <RkButton  
         rkType='rounded goToLoginButton' onPress={() => goToLogin(props.navigation)}>EXPLORÁ LA APP
        </RkButton>
      </View>
      
    </GenericContainer>
  </GenericContainer>