import { MetaTags } from "@redwoodjs/web";
import EditUserCell from "src/components/Admin/User/EditUserCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

type UserPageProps = {
  id: number;
};

const EditUserPage = ({ id }: UserPageProps) => {

  return (
    <FadeTransitionLayout>
    <div>
      <MetaTags title="Edit User" description="Edit User page" />
      <EditUserCell id={id} />
    </div>
    </FadeTransitionLayout>
  );
};

export default EditUserPage;
