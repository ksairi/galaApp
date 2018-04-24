import { StackNavigator } from 'react-navigation'
import Initial from '/screens/Initial'
import { Screens } from '/config/settings'
export default StackNavigator({
  [Screens.Initial]:{
    screen:Initial
  }
})