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
  },
  backButton:{
    marginTop:3,
    flex:1
  },
  portrait:{
  },
  landscape:{
    logo:{fontSize:30}
  }
}
styles.firstButton = styles.backButton

@connect(
  state=>({
      orientation:state.currentOrientation
  })
)
export default class Header extends React.PureComponent{

  state = {}

  static getDerivedStateFromProps(nextProps, prevState){
    var newState = {}
    if(nextProps.isHomeHeader != prevState.isHomeHeader){
        newState.isHomeHeader = nextProps.isHomeHeader
        newState.navigationDrawerIndexState = nextProps.navigation.state.index
    }

    if(nextProps.navigation.state.index != prevState.navigationDrawerIndexState){
      newState.isMenuClosed = (nextProps.navigation.state.index === 0)
        newState.navigationDrawerIndexState = nextProps.navigation.state.index
    }

    if(nextProps.orientation){
      newState.headerStyle = nextProps.orientation =='landscape' ? styles.landscape : styles.portrait
    }

    return newState

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
          { this.props.isHomeHeader ?
            <TouchableOpacity onPress={this.onMenuPressed} style={styles.firstButton}>
              <Icon name={this.state.isMenuClosed ? 'classes' : 'arrow-navigation-white-left'} size={20} color='white'/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.onBackPressed} style={styles.backButton}>
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
