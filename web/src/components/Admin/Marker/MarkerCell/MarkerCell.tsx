import type { FindMarkerById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import LoadingComponent from "src/components/Loading/Loading";
import Marker from "src/components/Admin/Marker/Marker";
import { Link, routes } from "@redwoodjs/router";

export const QUERY = gql`
  query FindMarkerById($id: Int!) {
    marker: marker(id: $id) {
      id
      url
      userId
      createdAt
      updatedAt
      deleted
      deletedAt
    }
  }
`;

export const Loading = () => null;

export const Empty = () => <div>Marker not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ marker }: CellSuccessProps<FindMarkerById>) => {
  return (
    <div className="m-8">
    <div className="p-2">
        <div className="font-semibold space-x-2">
            <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
            Users
            </Link>
            <span>&gt;</span>
            <Link to={routes.adminUser({ id: marker.userId })} className="hover:underline hover:underline-offset-1">
            { marker.userId }
            </Link>
            <span>&gt;</span>
            <Link to={routes.adminMarkers({ id: marker.userId })} className="hover:underline hover:underline-offset-1">
              Markers
            </Link>
            <span>&gt;</span>
            <Link to={routes.adminImage({ id: marker.userId })} className="hover:underline hover:underline-offset-1">
              { marker.id }
            </Link>
        </div>
      </div>
      <div className="mt-8">
        <Marker marker={marker} />
      </div>
    </div>
  );
};
