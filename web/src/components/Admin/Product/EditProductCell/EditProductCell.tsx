import type { EditProductById, UpdateProductInput } from "types/graphql";

import { Link, navigate, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import ProductForm from "src/components/Admin/Product/ProductForm";

export const QUERY = gql`
  query EditProductById($id: Int!) {
    product: product(id: $id) {
      id
      name
      availability
      userId
    }
  }
`;
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation($id: Int!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      availability
      userId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ product }: CellSuccessProps<EditProductById>) => {
  const [updateProduct, { loading, error }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success("Product updated");
        navigate(routes.adminProducts());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateProductInput,
    id: EditProductById["product"]["id"]
  ) => {
    updateProduct({ variables: { id, input } });
  };

  return (
    <>
    <div className="p-2">
      <div className="font-semibold space-x-2 items-end">
        <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
          Users
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
          { product.userId }
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminProducts()} className="hover:underline hover:underline-offset-1">
          Products
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminProduct({ id: product.id })} className="hover:underline hover:underline-offset-1">
          { product.name }
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminEditProduct({ id: product.id })} className="hover:underline hover:underline-offset-1">
          Edit
        </Link>
      </div>
    </div>
    <div className="">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Product {product?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProductForm
          product={product}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
    </>
  );
};
