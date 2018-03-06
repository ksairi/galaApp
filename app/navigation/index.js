import { StackNavigator  } from 'react-navigation'
import { Screens } from '../config/settings'
import loginStack from './login/loginStack'
import homeStack from './home/homeStack'



/*class HomeDrawerStackContainer extends React.Component {
  
  render() {
    return <HomeDrawerStack screenProps={{[Keys.newMember]:this.props.navigation.state.params[Keys.newMember]}} />
  }
}



const defaultGetStateForAction = HomeDrawerStack.router.getStateForAction

HomeDrawerStack.router.getStateForAction = (action, state) => {
  if(state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerClose') {
    console.log('DrawerClose')
  }

  if(state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerOpen') {
    console.log('DrawerOpen')
  }

  return defaultGetStateForAction(action, state)
}*/

const AppNavigator = StackNavigator({
  [Screens.LoginStack]: { screen: loginStack },
  [Screens.HomeStack]: { screen: homeStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.LoginStack
})


export default AppNavigator

