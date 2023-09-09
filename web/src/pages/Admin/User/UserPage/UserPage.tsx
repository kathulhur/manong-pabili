import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import UserCell from "src/components/Admin/User/UserCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

type UserPageProps = {
  id: number;
};

const UserPage = ({ id }: UserPageProps) => {
  return (
  <FadeTransitionLayout>
    <div>
      <MetaTags title="User" description="User page" />
      <UserCell id={id} />
    </div>
  </FadeTransitionLayout>
  );
};

export default UserPage;
