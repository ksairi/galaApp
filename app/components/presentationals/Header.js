import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from '/helpers/ImageHelper'
import { headerBackgroundColor } from '/components/styles'
import Logo from 'components/presentationals/Logo'


function onMenuPress(isMenuClosed, navigation){

  isMenuClosed ? navigation.navigate('DrawerOpen') : navigation.navigate('DrawerClose')
}

export default ({navigation, homeHeader}) =>{

  var isMenuClosed

  if(homeHeader){
    isMenuClosed = (navigation.state.index === 0)
  }

  return(
    <View style={{flex:0.3, flexDirection:'row', alignItems:'flex-start', backgroundColor:headerBackgroundColor, marginTop:Expo.Constants.statusBarHeight, paddingTop:20}}>
      <View style={{flex:1}}>
        { homeHeader ?
          <TouchableOpacity onPress={()=>onMenuPress(isMenuClosed, navigation)}>
            <Icon name={isMenuClosed ? 'classes' : 'arrow-navigation-white-left'} size={40} color='white'/>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{flex:1}}>
            <Icon name='arrow-navigation-white-left' size={40} color='white'/>
          </TouchableOpacity>
        }
      </View>


        <View style={{flex:1.4, flexDirection:'row', justifyContent:'center'}}>
          <Logo style={{fontSize:170}} />
        </View>

        <View style={{flex:0.6, flexDirection:'row'}}/>

    </View>
  )
}
