import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Icon from '/helpers/ImageHelper'
import { headerBackgroundColor, containerPadding } from '/components/styles'
import Logo from 'components/presentationals/Logo'

const styles = {
  wrapper:{
    flex:0.1,
    flexDirection:'row',
    alignItems:'flex-start',
    backgroundColor:headerBackgroundColor,
    marginTop:Expo.Constants.statusBarHeight,
    paddingTop:20,
    paddingLeft:containerPadding
  }
}
@connect(
  state=>({
      headerStyle:state.headerStyle
  })
)
export default class Header extends React.PureComponent{

  state = {
    isMenuClosed:true,
    headerStyle:{}
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.homeHeader){
      return {
        isMenuClosed:(nextProps.navigation.state.index === 0)
      }
    }

    if(nextProps.headerStyle){
      return {
        headerStyle:nextProps.headerStyle
      }
    }

    return null

  }

  onMenuPressed = () =>{
      this.state.isMenuClosed ? this.props.navigation.navigate('DrawerOpen') : this.props.navigation.navigate('DrawerClose')
  }

  onBackPressed = () =>{
    this.props.navigation.goBack()
  }

  render(){
    return(
      <View style={styles.wrapper}>
        <View style={{flex:0.8}}>
          { this.props.homeHeader ?
            <TouchableOpacity onPress={this.onMenuPressed}>
              <Icon name={this.state.isMenuClosed ? 'classes' : 'arrow-navigation-white-left'} size={20} color='white'/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.onBackPressed} style={{flex:1}}>
              <Icon name='arrow-navigation-white-left' size={20} color='white'/>
            </TouchableOpacity>
          }
        </View>


          <View style={{flex:2.2, flexDirection:'row', justifyContent:'center'}}>
            <Logo style={[{fontSize:50}, this.state.headerStyle.logo]} />
          </View>

          <View style={{flex:1, flexDirection:'row'}}/>

      </View>
    )
  }
}
