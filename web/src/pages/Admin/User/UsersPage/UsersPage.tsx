import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import UsersCell from "src/components/Admin/User/UsersCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

const UsersPage = ({ page = 1 }) => {
  return (
      <FadeTransitionLayout>
      <div>
          <MetaTags title="Users" description="Users page" />
          <UsersCell page={page} paginate={(page) => routes.adminUsers({
            page
          })} />
      </div>
      </FadeTransitionLayout>
  );
};

export default UsersPage;
