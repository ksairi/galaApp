import React from 'react'
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import { SplashScreen } from 'expo'
import * as Font from 'expo-font'
import { PersistGate } from 'redux-persist/integration/react'
import AppContainer from './app/redux/AppContainer'
import configureStore from './app/redux/configureStore'
import Splash from './app/components/presentationals/Splash'

const { store, persistor } = configureStore()

export default class App extends React.Component {
  state = {
    haveResourcesLoaded: false,
    showSplashImage: false
  }

  constructor (props) {
    super(props)
    SplashScreen.preventAutoHide()
  }

  componentDidMount () {
    this._cacheResourcesAsync()
      .then(() => {
        this.setState({ showSplashImage: true, haveResourcesLoaded: true })
        this.startCounter()
      })
      .catch(error =>
        console.error(`Unexpected error thrown when loading:
    ${error.stack}`)
      )
  }
  _cacheResourcesAsync () {
    return Font.loadAsync({
      'lato-regular': require('assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('assets/fonts/Lato-Bold.ttf'),
      'brother-1816-bold': require('assets/fonts/Brother-1816-Bold.otf'),
      'Roboto': require('assets/fonts/Roboto.otf'),
      icomoon: require('assets/fonts/icomoon.ttf')
    })
  }

  onSplashImageLoad = () => {
    SplashScreen.hide()
  }

  startCounter = () => {
    setTimeout(() => {
      this.setState({ showSplashImage: false })
    }, 2000)
  }

  render () {
    const { haveResourcesLoaded, showSplashImage } = this.state
    if (!haveResourcesLoaded) {
      return null
    }
    if (showSplashImage) {
      return <Splash onSplashImageLoad={this.onSplashImageLoad} />
    }
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Splash onSplashImageLoad={this.onSplashImageLoad} />}
          persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}

YellowBox.ignoreWarnings(['Setting a timer', 'Remote debugger', 'Warning: ListView is deprecated'])
