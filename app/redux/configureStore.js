import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { persistStore } from 'redux-persist'
import persistedReducer from './reducers'

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

export default () => {
  const store = createStore(persistedReducer, enhancer)
  const persistor = persistStore(store)
  return { store, persistor }
}