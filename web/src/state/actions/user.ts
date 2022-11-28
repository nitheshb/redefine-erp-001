import { IGetUserSuccessAction, ILogout, LoggedInUser } from '../types/user'

export const getUserSuccess = (data: LoggedInUser): IGetUserSuccessAction => ({
  type: 'GET_USER_SUCCESS',
  data,
})

export const logout = (): ILogout => ({
  type: 'USER_LOGOUT',
})
