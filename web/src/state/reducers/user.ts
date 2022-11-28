import { Reducer } from '@reduxjs/toolkit'
import { TAction, LoggedInUser } from '../types/user'

const initialState: LoggedInUser = {
  email: '',
  token: '',
}

const reducer: Reducer<LoggedInUser, TAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

export default reducer
