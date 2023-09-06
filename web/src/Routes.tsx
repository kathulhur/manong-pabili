// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import VerifiedVendorLayout from './layouts/VerifiedVendorLayout/VerifiedVendorLayout'
import AdminNavLayout from './layouts/AdminNavLayout/AdminNavLayout'

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
      <Route path="/admin/login" page={AdminLoginPage} name="adminLogin" />
      <Route path="/admin/signup" page={AdminSignupPage} name="adminSignup" />
      <Route notfound page={NotFoundPage} />
      <Private unauthenticated="forbidden" roles={"VENDOR"}>
        <Set wrap={VerifiedVendorLayout}>
          <Route path="/vendor" page={HomePage} name="home" />
          <Route path="/vendor/products" page={ProductsPage} name="products" />
          <Route path="/vendor/account" page={VendorAccountPage} name="vendorAccount" />
        </Set>
      </Private>

      <Private unauthenticated='forbidden' roles={"ADMIN"}>
        <Set wrap={AdminNavLayout}>
          <Set wrap={ScaffoldLayout} title="Users" titleTo="adminUsers" buttonLabel="New User" buttonTo="adminNewUser">
            <Route path="/admin/users/new" page={AdminUserNewUserPage} name="adminNewUser" />
            <Route path="/admin/users/{id:Int}/edit" page={AdminUserEditUserPage} name="adminEditUser" />
            <Route path="/admin/users/{id:Int}" page={AdminUserUserPage} name="adminUser" />
            <Route path="/admin/users" page={AdminUserUsersPage} name="adminUsers" />
            <Route path="/admin/users/{userId:Int}/products" page={AdminUserUserProductsPage} name="userProducts" />
            <Route path="/admin/users/{userId:Int}/images" page={AdminUserUserImagesPage} name="userImages" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Products" titleTo="adminProducts" buttonLabel="New Product" buttonTo="adminNewProduct">
            <Route path="/admin/products/new" page={AdminProductNewProductPage} name="adminNewProduct" />
            <Route path="/admin/products/{id:Int}/edit" page={AdminProductEditProductPage} name="adminEditProduct" />
            <Route path="/admin/products/{id:Int}" page={AdminProductProductPage} name="adminProduct" />
            <Route path="/admin/products" page={AdminProductProductsPage} name="adminProducts" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Images" titleTo="adminImages" buttonLabel="New Image" buttonTo="adminNewImage">
            <Route path="/admin/images/new" page={AdminImageNewImagePage} name="adminNewImage" />
            <Route path="/admin/images/{id:Int}/edit" page={AdminImageEditImagePage} name="adminEditImage" />
            <Route path="/admin/images/{id:Int}" page={AdminImageImagePage} name="adminImage" />
            <Route path="/admin/images" page={AdminImageImagesPage} name="adminImages" />
          </Set>
          <Route path="/admin" page={AdminPage} name="admin"/>
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
