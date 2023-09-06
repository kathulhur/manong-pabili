import type { FindImages } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Images from "src/components/Admin/Image/Images";
import Pagination, { PaginationProps } from "src/components/Pagination/Pagination";

export const beforeQuery = ({ page, userId }) => {
  page = page ? parseInt(page, 10) : 1
  userId = userId ? parseInt(userId, 10) : null

  return { variables: { page, filter: { userId } } }
}


export const QUERY = gql`
  query FindImages($page: Int!, $filter: ImagePageFilterInput) {
    imagePage(page: $page, filter: $filter) {
      images {
        id
        title
        url
        userId
      }
      count
    }
  }
`;


export const isEmpty = ({ imagePage: { count } }: CellSuccessProps<FindImages>) => {
  return count === 0
}

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {"No images yet. "}
      {/* <Link to={routes.adminNewImage()} className="rw-link">
        {"Create one?"}
      </Link> */}
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export interface ImagesCellProps extends CellSuccessProps<FindImages>{
  paginate: PaginationProps["paginate"]
}

export const Success = ({ imagePage: { images, count }, paginate }: ImagesCellProps) => {
  return (
    <div>
      <Images images={images} />
      <Pagination count={count} paginate={paginate}/>
    </div>
  );
};
