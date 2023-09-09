import type { FindMarkers } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import LoadingComponent from "src/components/Loading/Loading";
import Markers from "src/components/Admin/Marker/Markers";
import Pagination, { PaginationProps } from "src/components/Pagination/Pagination";

export const beforeQuery = ({ page, userId }) => {
  page = page ? parseInt(page, 10) : 1
  userId = userId ? parseInt(userId, 10) : null

  return { variables: { page, filter: { userId } } }
}

export const QUERY = gql`
  query FindMarkers($page: Int, $filter: MarkerPageFilterInput) {
    markerPage(page: $page, filter: $filter) {
      markers {
        id
        url
        userId
        createdAt
        updatedAt
        deletedAt
        deleted
      }
      count
    }
  }
`;

export const Loading = () => null;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {"No markers yet. "}
      <Link to={routes.adminNewMarker()} className="rw-link">
        {"Create one?"}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export interface MarkersCellSuccessProps extends CellSuccessProps<FindMarkers>{
  userId: number
  paginate: PaginationProps["paginate"],
}

export const Success = ({ markerPage: { markers, count }, userId, paginate }: MarkersCellSuccessProps) => {
  return (
    <div className="m-8">
      <div className="m-2 flex justify-between">
        <div className="font-semibold space-x-2 flex items-end">
        {!userId &&
          <Link to={routes.adminMarkers()} className="hover:underline hover:underline-offset-1">
            Markers
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
            <Link to={routes.adminMarkers()} className="hover:underline hover:underline-offset-1">
              Markers
            </Link>
          </>
        }
        </div>
        { userId &&
          <Link to={routes.adminNewMarker({ userId })} className="flex items-center font-semibold border px-4 py-2 rounded-md">
              <div className="rw-button-icon">+</div> Add Marker
          </Link>
        }
        { !userId &&
          <Link to={routes.adminNewMarker()} className="flex items-center font-semibold border px-4 py-2 rounded-md">
              <div className="rw-button-icon">+</div> Add Marker
          </Link>
        }
      </div>
      <div className="mt-8">
        <div className="mb-2">
          <Pagination count={count} paginate={paginate}/>
        </div>
        <Markers markers={markers} />
      </div>

    </div>
  );
};
