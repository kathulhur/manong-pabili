import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import ProductsCell from "src/components/Admin/Product/ProductsCell";

const UserProductsPage = ({ id, page = 1}) => {

  return (
    <>
      <MetaTags title="User Products" description="UserProducts page" />
      <ProductsCell userId={id} page={page} paginate={(page) => routes.userProducts({
        id,
        page
      })} />
    </>
  );
};

export default UserProductsPage;
