import { Screens } from '../config/settings'
import AppNavigator from '../config/routes'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(Screens.LoginStack))

export default navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}