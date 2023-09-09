import type { EditMarkerById, UpdateMarkerInput } from "types/graphql";

import { Link, navigate, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";
import LoadingComponent from "src/components/Loading/Loading";
import MarkerForm from "src/components/Admin/Marker/MarkerForm";

export const QUERY = gql`
  query EditMarkerById($id: Int!) {
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
const UPDATE_MARKER_MUTATION = gql`
  mutation UpdateMarkerMutation($id: Int!, $input: UpdateMarkerInput!) {
    updateMarker(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ marker }: CellSuccessProps<EditMarkerById>) => {
  const [updateMarker, { loading, error }] = useMutation(
    UPDATE_MARKER_MUTATION,
    {
      onCompleted: () => {
        toast.success("Marker updated");
        navigate(routes.adminMarkers());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateMarkerInput,
    id: EditMarkerById["marker"]["id"]
  ) => {
    updateMarker({ variables: { id, input } });
  };

  return (
    <div className="m-8">
      <div>
        <div className="font-semibold space-x-2">
          <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
            Users
          </Link>
          <span>&gt;</span>
          <Link to={routes.adminUser({ id: marker.userId })} className="hover:underline hover:underline-offset-1">
            { marker.userId }
          </Link>
          <span>&gt;</span>
          <Link to={routes.adminImages()} className="hover:underline hover:underline-offset-1">
            Images
          </Link>
          <span>&gt;</span>
          <Link to={routes.adminImage({ id: marker.id })} className="hover:underline hover:underline-offset-1">
            { marker.id }
          </Link>
          <span>&gt;</span>
          <Link to={routes.adminEditImage({ id: marker.id })} className="hover:underline hover:underline-offset-1">
            Edit
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Edit Marker {marker?.id}
          </h2>
        </header>
        <div className="rw-segment-main">
          <MarkerForm
            marker={marker}
            onSave={onSave}
            error={error}
            loading={loading}
            />
        </div>
      </div>
    </div>
  );
};
