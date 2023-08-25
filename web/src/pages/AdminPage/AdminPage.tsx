import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useAuth } from "src/auth";

const AdminPage = () => {
  const { isAuthenticated, currentUser, logOut, loading} = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.adminLogin())
    }
  }, [isAuthenticated])



  return (
    <>
      <MetaTags title="Admin" description="Admin page" />
      <button onClick={logOut}>Logout</button>
      <h1> Admin Page </h1>
    </>
  );
};

export default AdminPage;
