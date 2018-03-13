import { createStore, applyMiddleware, compose } from 'redux'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { persistReducer, persistStore } from 'redux-persist'
import rootReducer from './reducers'

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
  storage
}

const persistedReducer = persistReducer(reduxPresistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)
  return { store, persistor }
}