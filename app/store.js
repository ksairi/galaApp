import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  })

const enhancer = compose(
	applyMiddleware(
	  thunkMiddleware, // lets us dispatch() functions
	  loggerMiddleware,
	)
)

export default createStore(reducer, enhancer)