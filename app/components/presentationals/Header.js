import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from '/helpers/ImageHelper'
import { headerBackgroundColor } from '/components/styles'
import Logo from 'components/presentationals/Logo'

export default class Header extends React.PureComponent{

  state = {
    isMenuClosed:true
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.homeHeader){
      return {
        isMenuClosed:(nextProps.navigation.state.index === 0)
      }
    }
    else{
      return null
    }
  }

  onMenuPressed = () =>{
      this.state.isMenuClosed ? this.props.navigation.navigate('DrawerOpen') : this.props.navigation.navigate('DrawerClose')
  }

  onBackPressed = () =>{
    this.props.navigation.goBack()
  }

  render(){
    return(
      <View style={{flex:0.1, flexDirection:'row', alignItems:'flex-start', backgroundColor:headerBackgroundColor, marginTop:Expo.Constants.statusBarHeight, paddingTop:20}}>
        <View style={{flex:1}}>
          { this.props.homeHeader ?
            <TouchableOpacity onPress={this.onMenuPressed}>
              <Icon name={this.state.isMenuClosed ? 'classes' : 'arrow-navigation-white-left'} size={40} color='white'/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.onBackPressed} style={{flex:1}}>
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
}
