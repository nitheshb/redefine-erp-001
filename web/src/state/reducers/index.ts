import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './user'

const appReducer = combineReducers({
  user: userReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    console.log('which one is first')
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer
