// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.

import { Router, Route, Redirect } from '@redwoodjs/router'

import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

import FinanceHomePagePage from './pages/FinanceHomePagePage/FinanceHomePagePage'
import Profile from './pages/Profile/Profile'

const defaultRoutes = () => {
  return (
    <>
      {/* <Route path="/admin/home" page={HomePage} name="home" />
      <Route path="/admin/users-admin" page={UsersAdminPage} name="usersAdmin" />
      <Route path="/admin/leads-manager" page={LeadsManagerPage} name="leadsManager" />
      <Route path="/admin/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" />
      <Route path="/admin/project-edit/{uid}" page={ProjectEditPage} name="projectEdit" />
      <Route path="/admin/project-module" page={ProjectModulePage} name="projectModule" />
      <Route path="/admin/crm-module" page={CrmHomePage} name="crmModule" />
      <Route path="/admin/finance-module" page={FinanceHomePagePage} name="financeModule" />
      <Route path="/admin/legal-module" page={LegalHomePage} name="legalModule" />
      <Route path="/admin/erp-account" page={ErpAccountHomePage} name="erpAccount" />
      <Route path="/users-admin" page={UsersAdminPage} name="usersAdmin" />
      <Route path="/leads-manager" page={LeadsManagerPage} name="leadsManager" />
      <Route path="/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" /> */}
      <Route path="/project-edit/{uid}" page={ProjectEditPage} name="projectEdit" />
      <Route path="/project-module" page={ProjectModulePage} name="projectModule" />
      {/* <Route path="/legal-module" page={LegalHomePage} name="legalModule" />
      <Route path="/finance-module" page={FinanceHomePagePage} name="financeModule" />
      <Route path="/crm-module" page={CrmHomePage} name="crmModule" /> */}
      <Route path="/erp-account" page={ErpAccountHomePage} name="erpAccount" />
    </>
  )
}
const Routes = () => {
  const { user } = useAuth()
  console.log('user yo yo is ', user)

  let UpdatedRoutes = defaultRoutes()
  if (user?.role == null) {
    console.log('user yo yo is it is ', user)
    UpdatedRoutes = (
      <>
        <Route path="/login" page={LoginPage} name="login" />
      </>
    )
    // return <Redirect to="/login" />
  } else if (user?.role?.includes(USER_ROLES.ADMIN)) {
    UpdatedRoutes = (
      <>
        <Route path="/admin/home" page={HomePage} name="home" />
        <Route path="/admin/users-admin" page={UsersAdminPage} name="usersAdmin" />
        <Route path="/admin/leads-manager" page={LeadsManagerPage} name="leadsManager" />
        <Route path="/admin/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" />
        <Route path="/admin/project-edit/{uid}" page={ProjectEditPage} name="projectEdit" />
        <Route path="/admin/project-module" page={ProjectModulePage} name="projectModule" />
        <Route path="/admin/crm-module" page={CrmHomePage} name="crmModule" />
        <Route path="/admin/finance-module" page={FinanceHomePagePage} name="financeModule" />
        <Route path="/admin/legal-module" page={LegalHomePage} name="legalModule" />
        <Route path="/admin/erp-account" page={ErpAccountHomePage} name="erpAccount" />
      </>
    )
  } else if (user?.role?.includes(USER_ROLES.HR_MANAGER) || user?.role?.includes(USER_ROLES.HR_EXECUTIVE)) {
    UpdatedRoutes = (
      <>
        <Route path="/users-admin" page={UsersAdminPage} name="usersAdmin" />
      </>
    )
  } else if (user?.role?.includes(USER_ROLES.SALES_MANAGER) || user?.role?.includes(USER_ROLES.SALES_EXECUTIVE) || user?.role?.includes(USER_ROLES.CP_AGENT)) {
    UpdatedRoutes = (
      <>
        <Route path="/leads-manager" page={LeadsManagerPage} name="leadsManager" />
        <Route path="/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" />
      </>
    )
  } else if (user?.role?.includes(USER_ROLES.CRM_MANAGER) || user?.role?.includes(USER_ROLES.CRM_EXECUTIVE)) {
    UpdatedRoutes = (
      <>
        <Route path="/crm-module" page={CrmHomePage} name="crmModule" />
      </>
    )
  } else if (user?.role?.includes(USER_ROLES.FINANCE_MANAGER) || user?.role?.includes(USER_ROLES.FINANCE_EXECUTIVE)) {
    UpdatedRoutes = (
      <>
        <Route path="/finance-module" page={FinanceHomePagePage} name="financeModule" />
      </>
    )
  } else if (user?.role?.includes(USER_ROLES.LEGAL_MANAGER) || user?.role?.includes(USER_ROLES.LEGAL_EXECUTIVE)) {
    UpdatedRoutes = (
      <>
        <Route path="/legal-module" page={LegalHomePage} name="legalModule" />
      </>
    )
  } else if (user?.role?.includes(USER_ROLES.PROJECT_MANAGER) || user?.role?.includes(USER_ROLES.PROJECT_EXECUTIVE)) {
    UpdatedRoutes = (
      <>
        <Route path="/home" page={HomePage} name="home" />
      </>
    )
  } else {
    if (user?.role) {
      console.log('user yo yo is am i here role issue')
      UpdatedRoutes = (
        <>
          <Route path="/access-denied" page={AccessDeniedPage} name="accessDenied" />
        </>
      )
    }
  }

  return (
    <Router>
      {/* <Route path="/admin/home" page={HomePage} name="home" /> */}
      <Route path="/erp-account-home" page={ErpAccountHomePage} name="erpAccountHome" />
      <Route path="/legal-home" page={LegalHomePage} name="legalHome" />
      <Route path="/crm-home" page={CrmHomePage} name="crmHome" />
      <Route path="/finance-home-page" page={FinanceHomePagePage} name="financeHomePage" />
      {UpdatedRoutes}
      <Route path="/profile" page={Profile} name="profile" />
      <Route path="/admin/login" page={LoginPage} name="login" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/" page={LoginPage} name="login" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
