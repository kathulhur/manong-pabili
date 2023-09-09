import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import ImagesCell from "src/components/Admin/Image/ImagesCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

const UserImagesPage = ({ page=1, id }) => {
  return (
    <FadeTransitionLayout>
      <div>
        <MetaTags title="Images" description="Images page" />

        <ImagesCell page={page} userId={id} paginate={(page) => routes.userImages({
          id,
          page
        })}/>
      </div>
    </FadeTransitionLayout>
  );
};

export default UserImagesPage;
