import { routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import ImagesCell from "src/components/Admin/Image/ImagesCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";


const ImagesPage = ({page}) => {
  return (
    <FadeTransitionLayout>
    <div>
      <MetaTags title="Images" description="Images page" />
      <ImagesCell page={page} paginate={(page) => routes.adminImages({
        page,
      })}/>
    </div>
    </FadeTransitionLayout>
  );
};

export default ImagesPage;
