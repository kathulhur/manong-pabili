import { Link, routes } from "@redwoodjs/router";
import useLogout from "src/hooks/useLogout";

type AdminNavLayoutProps = {
  children?: React.ReactNode;
  page?: any;
};

const AdminNavLayout = ({ children }: AdminNavLayoutProps) => {
  const logOut = useLogout()
  return (<>
    <nav className="max-w-7xl mx-auto py-4 px-8">
      <ul className="flex justify-between">
        <li>
          <Link to={routes.admin()}>Manong Pabili: Admin</Link>
        </li>
        <li>
          <ul className="flex justify-between space-x-8">
            <li>
              <Link to={routes.adminUsers()}>Users</Link>
            </li>
            <li>
              <Link to={routes.adminProducts()}>Products</Link>
            </li>
            <li>
              <Link to={routes.adminImages()}>Images</Link>
            </li>
            <li>
              <button onClick={ logOut }>Logout</button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <main className="max-w-7xl mx-auto">
      {children}
    </main>
  </>);
};

export default AdminNavLayout;
