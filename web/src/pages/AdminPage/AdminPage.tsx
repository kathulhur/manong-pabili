import { Link, navigate, routes, useParams } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useState } from "react";
import { useAuth } from "src/auth";
import ImagesCell from "src/components/Admin/Image/ImagesCell";
import ProductsCell from "src/components/Admin/Product/ProductsCell";
import UsersCell from "src/components/Admin/User/UsersCell";
import useLogout from "src/hooks/useLogout";
import ScaffoldLayout from "src/layouts/ScaffoldLayout/ScaffoldLayout";

const AdminPage = () => {
  const { isAuthenticated, loading } = useAuth()
  const logOut = useLogout()

  if (loading) {
    return "loading..."
  }

  if (!isAuthenticated) {
    navigate(routes.adminLogin())
    return null
  }

  return (
    <>
      <MetaTags title="Admin" description="Admin page" />
      <div className="mt-16 px-8">
        <h1 className="text-2xl font-bold">AdminPage</h1>
        <ul className="space-y-4 text-lg font-semibold mt-8">
          <li>
            <Link to={routes.adminUsers()}>Users &gt;</Link>
          </li>
          <li>
            <Link to={routes.adminProducts()}>Products &gt;</Link>
          </li>
          <li>
            <Link to={routes.adminImages()}>Images &gt;</Link>
          </li>
        </ul>
      </div>


    </>
  );
};

export default AdminPage;
