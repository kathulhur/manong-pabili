import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useAuth } from "src/auth";
import AdminDashboardCell from "src/components/AdminDashboardCell";


const AdminPage = ({ page = 1}) => {
  const { isAuthenticated, currentUser, loading} = useAuth()

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
      <AdminDashboardCell page={page} />
    </>
  );
};

export default AdminPage;
