import React from 'react'
import { Provider } from 'react-redux'
import AppContainer from './app/containers/AppContainer'
import store from './app/store'


export default App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)