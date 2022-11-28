import { navigate, routes } from '@redwoodjs/router'
import { getUser } from 'src/context/dbQueryFirebase'
import { USER_ROLES } from 'src/constants/userRoles'

export const navigateBasedOnUser = async (userData) => {
  console.log('user data stuf s ', userData)

  if (!userData) {
    console.log('where am i 0')
    return false
  }
  if (userData.role.includes(USER_ROLES.ADMIN)) {
    console.log('where am i ', userData)
    await navigate(routes.home(), { replace: true })
  } else if (
    userData.role.includes(USER_ROLES.PROJECT_MANAGER) ||
    userData.role.includes(USER_ROLES.PROJECT_EXECUTIVE)
  ) {
    console.log('where am i 2')
    await navigate(routes.home(), { replace: true })
  } else if (
    userData.role.includes(USER_ROLES.SALES_MANAGER) ||
    userData.role.includes(USER_ROLES.SALES_EXECUTIVE) ||
    userData.role.includes(USER_ROLES.CP_AGENT)
  ) {
    console.log('where am i 3')
    await navigate(routes.leadsManager(), { replace: true })
  } else if (
    userData.role.includes(USER_ROLES.HR_MANAGER) ||
    userData.role.includes(USER_ROLES.HR_EXECUTIVE)
  ) {
    console.log('where am i 4')
    await navigate(routes.usersAdmin(), { replace: true })
  } else if (
    userData.role.includes(USER_ROLES.CRM_MANAGER) ||
    userData.role.includes(USER_ROLES.CRM_EXECUTIVE)
  ) {
    console.log('where am i 5')
    await navigate(routes.crmModule(), { replace: true })
  } else if (
    userData.role.includes(USER_ROLES.FINANCE_MANAGER) ||
    userData.role.includes(USER_ROLES.FINANCE_EXECUTIVE)
  ) {
    await navigate(routes.financeModule(), { replace: true })
  } else if (
    userData.role.includes(USER_ROLES.LEGAL_MANAGER) ||
    userData.role.includes(USER_ROLES.LEGAL_EXECUTIVE)
  ) {
    await navigate(routes.legalModule(), { replace: true })
  } else {
    userData.role && navigate(routes.accessDenied(), { replace: true })
  }
  return false
}
