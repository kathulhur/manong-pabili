// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={IndexPage} name="index" />
      <Route path="/vendor" page={HomePage} name="home" />
      <Route path="/vendor/products" page={ProductsPage} name="products" />
      <Route path="/vendor/account" page={VendorAccountPage} name="vendorAccount" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/map" page={MapPage} name="map" />
      <Route path="/admin" page={AdminPage} name="admin" />
      <Route path="/admin/signup" page={AdminSignupPage} name="adminSignup" />
      <Route path="/admin/login" page={AdminLoginPage} name="adminLogin" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
