import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import ProductsCell from "src/components/Admin/Product/ProductsCell";

const UserProductsPage = ({ userId, page = 1}) => {
  if (typeof page === "string") {
    page = parseInt(page, 10);
  }

  return (
    <>
      <MetaTags title="UserProducts" description="UserProducts page" />
      <ProductsCell userId={userId} page={page} paginate={(page) => routes.userProducts({
        userId,
        page
      })} />
    </>
  );
};

export default UserProductsPage;
