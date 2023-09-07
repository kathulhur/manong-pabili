import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import ImagesCell from "src/components/Admin/Image/ImagesCell";

const UserImagesPage = ({ page=1, id }) => {
  return (
    <>
      <MetaTags title="UserImages" description="UserImages page" />

      <ImagesCell page={page} userId={id} paginate={(page) => routes.userImages({
        id,
        page
      })}/>
    </>
  );
};

export default UserImagesPage;
