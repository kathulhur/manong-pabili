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

export const Loading = () => null;

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
  paginate: PaginationProps["paginate"],
  userId: number
}

export const Success = ({ imagePage: { images, count }, paginate, userId }: ImagesCellProps) => {
  return (
    <div className="m-8">
        <div className="flex justify-between">
          <div className="font-semibold space-x-2 flex items-end">
          {!userId &&
            <Link to={routes.adminImages()} className="hover:underline hover:underline-offset-1">
              Images
            </Link>
          }
          {userId && <>
            <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
            Users
            </Link>
              <span>&gt;</span>
              <Link to={routes.adminUser({ id: userId })} className="hover:underline hover:underline-offset-1">
                { userId }
              </Link>
              <span>&gt;</span>
              <Link to={routes.adminImages()} className="hover:underline hover:underline-offset-1">
                Images
              </Link>
            </>
          }
          </div>
          { userId &&
            <Link to={routes.adminNewImage({ userId })} className="flex items-center font-semibold border px-4 py-2 rounded-md">
                <div className="rw-button-icon">+</div> Add Image
            </Link>
          }
          { !userId &&
            <Link to={routes.adminNewImage()} className="flex items-center font-semibold border px-4 py-2 rounded-md">
                <div className="rw-button-icon">+</div> Add Image
            </Link>
          }
        </div>
        <div className="mt-8">
          <div className="mb-2">
            <Pagination count={count} paginate={paginate}/>
          </div>
          <Images images={images} />
        </div>
    </div>
  );
};
