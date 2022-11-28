import { Action } from '@reduxjs/toolkit'

export interface LoggedInUser {
  email: string
  token: string
  [key: string]: unknown
}

export interface IGetUserSuccessAction extends Action<'GET_USER_SUCCESS'> {
  data: LoggedInUser
}

export interface ILogout extends Action<'USER_LOGOUT'> {}

export type TAction = IGetUserSuccessAction | ILogout
