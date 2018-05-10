import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from '/helpers/ImageHelper'
import { headerBackgroundColor } from '/components/styles'


function onMenuPress(isMenuClosed, navigation){

  isMenuClosed ? navigation.navigate('DrawerOpen') : navigation.navigate('DrawerClose')
}

export default ({navigation, homeHeader}) =>{
  
  var isMenuClosed
  
  if(homeHeader){
    isMenuClosed = (navigation.state.index === 0)  
  }

  return(
    <View style={{flexDirection:'row', backgroundColor:headerBackgroundColor, marginTop:Expo.Constants.statusBarHeight, paddingTop:10 }}>
      <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
        { homeHeader ?
          <TouchableOpacity onPress={()=>onMenuPress(isMenuClosed, navigation)}>
            <Icon name={isMenuClosed ? 'classes' : 'arrow-navigation-white-left'} size={60} color='white'/>
          </TouchableOpacity>
          :  
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Icon name='arrow-navigation-white-left' size={50} color='white'/>
          </TouchableOpacity>
        }
      </View>
      
      <View style={{flex:2.3, flexDirection:'row', justifyContent:'center'}}>
        {/*<Icon name='logo-gala' size={200} color='white'/>*/}
      </View>
      
      <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}/>
    </View>
  )
}