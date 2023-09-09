import { routes } from "@redwoodjs/router";
import ProductsCell from "src/components/Admin/Product/ProductsCell";
import FadeTransitionLayout from "src/layouts/FadeTransitionLayout/FadeTransitionLayout";

export interface ProductsPageProps {
  page: number
  userId: number
}

const ProductsPage = ({ page }) => {
  return (
    <FadeTransitionLayout>
      <div>
        <ProductsCell page={page} paginate={(page) => routes.adminProducts({
          page,
        })}/>
      </div>
    </FadeTransitionLayout>
  );
};

export default ProductsPage;
