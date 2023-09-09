import { MetaTags } from "@redwoodjs/web";
import EditImageCell from "src/components/Admin/Image/EditImageCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

type ImagePageProps = {
  id: number;
};

const EditImagePage = ({ id }: ImagePageProps) => {
  return (
    <FadeTransitionLayout>
      <div>
        <MetaTags title="Edit Image" description="Edit image page" />
        <EditImageCell id={id} />
      </div>
    </FadeTransitionLayout>
  );
};

export default EditImagePage;
