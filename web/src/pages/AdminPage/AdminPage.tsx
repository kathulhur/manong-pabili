import { Form, Label, Submit, TextField } from "@redwoodjs/forms";
import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useState } from "react";
import { useAuth } from "src/auth";
import AdminDashboardCell from "src/components/AdminDashboardCell";
import useLogout from "src/hooks/useLogout";

const AdminPage = ({ page = 1}) => {
  const { isAuthenticated, currentUser, loading } = useAuth()
  const logOut = useLogout()
  const [searchKey, setSearchKey] = useState("")
  if (loading) {
    return null
  }

  if (isAuthenticated && currentUser && !currentUser.roles.includes("ADMIN")) {
    return <div>
      <p>Forbidden: Only admin can access this page.</p>
      <Link to={routes.index()}>Go to Home</Link>
    </div>
  }

  return (
    <>
      <MetaTags title="Admin" description="Admin page" />
      <button onClick={ logOut }>Logout</button>
      <h1>Admin Panel</h1>
      <Form
        onSubmit={({ search }) => setSearchKey(search)}
      >
        <Label name="search" />
        <TextField
          name="search"
          placeholder="Search"
          defaultValue=""
        />
        <Submit>Search</Submit>
      </Form>
      <AdminDashboardCell page={page} searchKey={searchKey}/>
    </>
  );
};

export default AdminPage;
