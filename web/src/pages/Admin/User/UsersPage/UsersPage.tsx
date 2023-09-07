import { Link, routes } from "@redwoodjs/router";
import UsersCell from "src/components/Admin/User/UsersCell";

const UsersPage = ({ page = 1 }) => {
  return (
    <div>
      <UsersCell page={page} paginate={(page) => routes.adminUsers({
        page
      })} />
    </div>
  );
};

export default UsersPage;
