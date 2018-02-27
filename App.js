import React from 'react'
import AppContainer from './app/containers/AppContainer'
import { Provider } from 'react-redux'
import store from './app/store'


export default App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)