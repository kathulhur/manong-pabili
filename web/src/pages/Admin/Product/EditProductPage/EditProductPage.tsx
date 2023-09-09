import { MetaTags } from "@redwoodjs/web";
import EditProductCell from "src/components/Admin/Product/EditProductCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

type ProductPageProps = {
  id: number;
};

const EditProductPage = ({ id }: ProductPageProps) => {
  return (
    <FadeTransitionLayout>
      <div>
        <MetaTags title="Edit Product" description="Products page" />
        <EditProductCell id={id} />
      </div>
    </FadeTransitionLayout>
  );
};

export default EditProductPage;
