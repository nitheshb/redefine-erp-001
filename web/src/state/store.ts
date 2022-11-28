import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const middlewares = []

const enhancers = [applyMiddleware(...middlewares)]

let composeEnhancers
if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose
} else {
  composeEnhancers = require('redux-devtools-extension').composeWithDevTools
}

// mount it on the Store
const store = createStore(rootReducer, composeEnhancers(...enhancers))

export default store
