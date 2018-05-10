import React from 'react'
import { Provider } from 'react-redux'
import { Font, AppLoading } from 'expo'
import { PersistGate } from 'redux-persist/integration/react'
import AppContainer from './app/redux/AppContainer'
import configureStore from './app/redux/configureStore'
import { LoadingSpinner } from './app/components/presentationals/Spinner'

const { store, persistor } = configureStore()

export default class App extends React.Component {

  state = {
    haveResourcesLoaded: false
  }

  async _cacheResourcesAsync(){
    await Font.loadAsync({
      'lato-regular' : require('./assets/fonts/Lato-Regular.ttf'),
      'lato-bold' : require('./assets/fonts/Lato-Bold.ttf'),
      'brother-1816-bold' : require('./assets/fonts/Brother-1816-Bold.otf'),
      'icomoon': require('./assets/fonts/icomoon.ttf')
    })
  }
  render(){
    const { haveResourcesLoaded } = this.state
    if(!haveResourcesLoaded){
      return(<AppLoading startAsync={this._cacheResourcesAsync}
        onFinish={() => this.setState({ haveResourcesLoaded: true })}
        onError={console.warn}/>)
    }
     return( 
        <Provider store={store}>
          <PersistGate loading={<LoadingSpinner visible={true}/>} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      )
  }
}

console.ignoredYellowBox = [
    'Setting a timer',
    'Remote debugger'
]