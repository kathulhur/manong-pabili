import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import ImagesCell from "src/components/Admin/Image/ImagesCell";

const UserImagesPage = ({ page=1, userId }) => {
  return (
    <>
      <MetaTags title="UserImages" description="UserImages page" />

      <ImagesCell page={page} userId={userId} paginate={(page) => routes.userImages({
        userId,
        page
      })}/>
    </>
  );
};

export default UserImagesPage;
