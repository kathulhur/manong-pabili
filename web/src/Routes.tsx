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
import AdminNavLayout from './layouts/AdminNavLayout/AdminNavLayout'

const Routes = () => {
    return (
        <Router useAuth={useAuth}>
            <Route path="/forbidden" page={ForbiddenPage} name="forbidden" />
            <Route path="/" page={IndexPage} name="index" />
            <Route path="/auth/login" page={AuthLoginPage} name="login" />
            <Route path="/auth/signup" page={AuthSignupPage} name="signup" />

            <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
            <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
            <Route path="/consumer/map" page={ConsumerMapPage} name="consumerMap" />

            <Route notfound page={NotFoundPage} />

            <Private unauthenticated="login" roles={'VENDOR'}>
                <Set wrap={VerifiedVendorLayout}>
                    <Route path="/vendor" page={VendorIndexPage} name="vendorIndex" />
                    <Route path="/vendor/products" page={VendorProductsPage} name="vendorProducts" />
                    <Route path="/vendor/account" page={VendorAccountPage} name="vendorAccount" />
                </Set>
            </Private>

            <Private unauthenticated="login" roles={'ADMIN'}>
                <Set wrap={AdminNavLayout}>
                    <Route path="/admin/users/new" page={AdminUserNewUserPage} name="adminNewUser" />
                    <Route path="/admin/users/{id:Int}/edit" page={AdminUserEditUserPage} name="adminEditUser" />
                    <Route path="/admin/users/{id:Int}" page={AdminUserUserPage} name="adminUser" />
                    <Route path="/admin/users" page={AdminUserUsersPage} name="adminUsers" />

                    <Route path="/admin/users/{id:Int}/products" page={AdminUserUserProductsPage} name="adminUserProducts" />
                    <Route path="/admin/products/new" page={AdminProductNewProductPage} name="adminNewProduct" />
                    <Route path="/admin/products/{id:Int}/edit" page={AdminProductEditProductPage} name="adminEditProduct" />
                    <Route path="/admin/products/{id:Int}" page={AdminProductProductPage} name="adminProduct" />
                    <Route path="/admin/products" page={AdminProductProductsPage} name="adminProducts" />

                    <Route path="/admin/users/{id:Int}/images" page={AdminUserUserImagesPage} name="adminUserImages" />
                    <Route path="/admin/images/new" page={AdminImageNewImagePage} name="adminNewImage" />
                    <Route path="/admin/images/{id:Int}/edit" page={AdminImageEditImagePage} name="adminEditImage" />
                    <Route path="/admin/images/{id:Int}" page={AdminImageImagePage} name="adminImage" />
                    <Route path="/admin/images" page={AdminImageImagesPage} name="adminImages" />

                    <Route path="/admin/markers/new" page={AdminMarkerNewMarkerPage} name="adminNewMarker" />
                    <Route path="/admin/markers/{id:Int}/edit" page={AdminMarkerEditMarkerPage} name="adminEditMarker" />
                    <Route path="/admin/markers/{id:Int}" page={AdminMarkerMarkerPage} name="adminMarker" />
                    <Route path="/admin/markers" page={AdminMarkerMarkersPage} name="adminMarkers" />

                    <Route path="/admin" page={AdminIndexPage} name="admin" />
                </Set>
            </Private>
        </Router>
    )
}

export default Routes
