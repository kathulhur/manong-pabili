// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import VerifiedVendorLayout from './layouts/VerifiedVendorLayout/VerifiedVendorLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/forbidden" page={ForbiddenPage} name="forbidden" />
      <Route path="/" page={IndexPage} name="index" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/map" page={MapPage} name="map" />
      <Route notfound page={NotFoundPage} />
      <Private unauthenticated="forbidden" roles={"VENDOR"}>
        <Set wrap={VerifiedVendorLayout}>
          <Route path="/vendor" page={HomePage} name="home" />
          <Route path="/vendor/products" page={ProductsPage} name="products" />
          <Route path="/vendor/account" page={VendorAccountPage} name="vendorAccount" />
        </Set>
      </Private>
      <Private unauthenticated='forbidden' roles={"ADMIN"}>
        <Route path="/admin" page={AdminPage} name="admin" />
        <Route path="/admin/signup" page={AdminSignupPage} name="adminSignup" />
        <Route path="/admin/login" page={AdminLoginPage} name="adminLogin" />
      </Private>
    </Router>
  )
}

export default Routes
