import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AppContainer from './app/redux/AppContainer'
import configureStore from './app/redux/configureStore'
import { LoadingSpinner } from './app/components/presentationals/Spinner'

const { store, persistor } = configureStore()

export default App = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingSpinner visible={true}/>} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
)

console.ignoredYellowBox = [
    'Setting a timer' // https://github.com/status-im/status-react/pull/2853    // https://github.com/facebook/react-native/issues/12981
]