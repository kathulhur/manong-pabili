import { routes } from "@redwoodjs/router";
import ProductsCell from "src/components/Admin/Product/ProductsCell";

export interface ProductsPageProps {
  page: number
  userId: number
}

const ProductsPage = ({ page }) => {
  return <ProductsCell page={page} paginate={(page) => routes.adminProducts({
    page,
  })}/>;
};

export default ProductsPage;
