import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import ProductsCell from "src/components/Admin/Product/ProductsCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

const UserProductsPage = ({ id, page = 1}) => {

  return (
    <FadeTransitionLayout>
    <div>
      <MetaTags title="Products" description="Products page" />
      <ProductsCell userId={id} page={page} paginate={(page) => routes.userProducts({
        id,
        page
      })} />
    </div>
    </FadeTransitionLayout>
  );
};

export default UserProductsPage;
