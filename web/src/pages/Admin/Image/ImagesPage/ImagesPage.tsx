import { routes } from "@redwoodjs/router";
import ImagesCell from "src/components/Admin/Image/ImagesCell";


const ImagesPage = ({page}) => {
  return (
    <div>
      <ImagesCell page={page} paginate={(page) => routes.adminImages({
        page,
      })}/>
    </div>
  );
};

export default ImagesPage;
