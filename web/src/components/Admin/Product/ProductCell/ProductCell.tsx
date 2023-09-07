import type { FindProductById } from "types/graphql";

import { type CellSuccessProps, type CellFailureProps, MetaTags } from "@redwoodjs/web";

import Product from "src/components/Admin/Product/Product";
import { Link, routes } from "@redwoodjs/router";

export const QUERY = gql`
  query FindProductById($id: Int!) {
    product: product(id: $id) {
      id
      name
      availability
      userId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Product not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ product }: CellSuccessProps<FindProductById>) => {
  return (
    <>
      <MetaTags title="User Product" description="UserProducts page" />
      <div className="m-2">
        <div className="text-xl font-semibold space-x-2">
          <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
            Users
          </Link>
          <span>&gt;</span>
          <Link to={routes.adminUser({ id: product.userId })} className="hover:underline hover:underline-offset-1">
            { product.userId }
          </Link>
          <span>&gt;</span>
          <Link to={routes.userProducts({ id: product.userId })} className="hover:underline hover:underline-offset-1">
            Products
          </Link>
          <span>&gt;</span>
          <Link to={routes.userProducts({ id: product.userId })} className="hover:underline hover:underline-offset-1">
            { product.name }
          </Link>
        </div>
      </div>
      <Product product={product} />
    </>
  );
};
