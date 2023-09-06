import type { FindProducts } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Products from "src/components/Admin/Product/Products";
import Pagination, { PaginationProps } from "src/components/Pagination/Pagination";

export const beforeQuery = ({ page, userId }) => {
  page = page ? parseInt(page, 10) : 1
  userId = userId ? parseInt(userId, 10) : null

  return { variables: { page, filter: { userId } } }
}

export const isEmpty = ({ productPage: { count } }: CellSuccessProps<FindProducts>) => {
  return count === 0
}


export const QUERY = gql`
  query FindProducts($page: Int, $filter: ProductPageFilterInput) {
    productPage(page: $page, filter: $filter) {
      products {
        id
        name
        availability
        userId
      }
      count
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  console.log('empty')
  return (
    <div className="rw-text-center">
      {"No products yet. "}
      {/* <Link to={routes.adminNewProduct()} className="rw-link">
        {"Create one?"}
      </Link> */}
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

interface SuccessProps extends CellSuccessProps<FindProducts> {
  paginate: PaginationProps['paginate']
}

export const Success = ({ productPage: { products, count }, paginate }: SuccessProps) => {
  return (
    <div>
      <Products products={products}/>
      <Pagination count={count} paginate={paginate} />
    </div>);
};
