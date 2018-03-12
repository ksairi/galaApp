import { createStore, applyMiddleware, compose } from 'redux'
import { AsyncStorage } from 'react-native'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { REHYDRATE, PURGE, persistCombineReducers, persistStore } from 'redux-persist'
import reducers from './reducers'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  })

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
)

const enhancer = compose(
	applyMiddleware(
	  thunkMiddleware, // lets us dispatch() functions
	  loggerMiddleware,
    navigationMiddleware
	)
)

const reduxPresistConfig = {
  key: 'primary',
  storage: AsyncStorage
}

const presistReducers = persistCombineReducers(reduxPresistConfig, reducers)
const store = createStore(presistReducers, enhancer)

persistStore(store, null, () => { store.getState })

export default store