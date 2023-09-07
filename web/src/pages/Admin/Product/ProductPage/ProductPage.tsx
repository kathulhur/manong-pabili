import ProductCell from "src/components/Admin/Product/ProductCell";

type ProductPageProps = {
  id: number;
};

const ProductPage = ({ id }: ProductPageProps) => {
  return <ProductCell id={id} />;
};

export default ProductPage;
