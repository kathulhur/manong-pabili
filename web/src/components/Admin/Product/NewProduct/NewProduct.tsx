import { navigate, routes, useParams } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import ProductForm from "src/components/Admin/Product/ProductForm";

import type { CreateProductInput } from "types/graphql";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProductMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      availability
    }
  }
`;

const NewProduct = () => {
  const params = useParams();
  const queryParams = params?.userId ? { userId: params.userId } : {};
  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success("Product created");
        navigate(routes.adminProducts(queryParams));
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateProductInput) => {
    createProduct({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Product</h2>
      </header>
      <div className="rw-segment-main">
        <ProductForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewProduct;
