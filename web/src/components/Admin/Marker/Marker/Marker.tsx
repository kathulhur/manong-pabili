import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { checkboxInputTag, timeTag } from "src/lib/formatters";

import type {
  DeleteMarkerMutationVariables,
  FindMarkerById,
} from "types/graphql";

export const DELETE_MARKER_MUTATION = gql`
  mutation DeleteMarkerMutation($id: Int!) {
    softDeleteMarker(id: $id) {
      id
    }
  }
`;

interface Props {
  marker: NonNullable<FindMarkerById["marker"]>;
}

const Marker = ({ marker }: Props) => {
  const [deleteMarker] = useMutation(DELETE_MARKER_MUTATION, {
    onCompleted: () => {
      toast.success("Marker deleted");
      navigate(routes.adminMarkers());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteMarkerMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete marker " + id + "?")) {
      deleteMarker({ variables: { id } });
    }
  };

  return (
    <>
      <div className="">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Marker {marker.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{marker.id}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{marker.url}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{marker.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(marker.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(marker.updatedAt)}</td>
            </tr>
            <tr>
              <th>Deleted</th>
              <td>{checkboxInputTag(marker.deleted)}</td>
            </tr>
            <tr>
              <th>Deleted at</th>
              <td>{timeTag(marker.deletedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditMarker({ id: marker.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(marker.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Marker;
