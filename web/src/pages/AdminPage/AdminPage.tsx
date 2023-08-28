import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useAuth } from "src/auth";
import AdminDashboardCell from "src/components/AdminDashboardCell";


const AdminPage = ({ page = 1}) => {
  const { logOut } = useAuth()



  return (
    <>
      <MetaTags title="Admin" description="Admin page" />
      <AdminDashboardCell page={page} />
    </>
  );
};

export default AdminPage;
