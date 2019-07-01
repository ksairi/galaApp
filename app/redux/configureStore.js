import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import persistedReducer from './reducers'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware
  )
)

export default () => {
  const store = createStore(persistedReducer, enhancer)
  const persistor = persistStore(store)
  return { store, persistor }
}
