import createReducer from './lib/createReducer'
import { ActionsTypes } from '/config/settings'

export const isLoggedIn = createReducer(false, {
  [ActionsTypes.LOG_IN]() {
    return true
  },
  [ActionsTypes.LOG_OUT]() {
    return false
  }
})