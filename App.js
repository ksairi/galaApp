import React from 'react'
import { Provider } from 'react-redux'
import AppContainer from './app/redux/AppContainer'
import store from './app/redux/store'


export default App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)