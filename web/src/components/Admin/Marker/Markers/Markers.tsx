import { Link, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { QUERY } from "src/components/Admin/Marker/MarkersCell";
import { checkboxInputTag, timeTag, truncate } from "src/lib/formatters";

import type { DeleteMarkerMutationVariables, FindMarkers } from "types/graphql";
import { DELETE_MARKER_MUTATION } from "../Marker/Marker";
import { formatDatetime } from "src/pages/MapPage/MapPage";

const MarkersList = ({ markers }: {
  markers: FindMarkers['markerPage']['markers']
}) => {
  const [deleteMarker] = useMutation(DELETE_MARKER_MUTATION, {
    onCompleted: () => {
      toast.success("Marker deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    update: (cache, { data: { softDeleteMarker } }) => {
      const deletedMarkerId = softDeleteMarker?.id;
      cache.modify({
        fields: {
          markerPage: (existingMarkerPage: FindMarkers['markerPage'], { readField }): FindMarkers['markerPage'] => {
            return ({
              ...existingMarkerPage,
              markers: existingMarkerPage.markers.filter(
                (marker) => deletedMarkerId !== readField("id", marker),
              ),
              count: existingMarkerPage.count - 1,
            });
          },
        },
      });
    }
  });

  const onDeleteClick = (id: DeleteMarkerMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete marker " + id + "?")) {
      deleteMarker({ variables: { id } });
    }
  };

  return (
    <div className="rw-table-wrapper-responsive">
      <table className="rw-table whitespace-nowrap">
        <thead>
          <tr>
            <th>Id</th>
            <th>Url</th>
            <th>Marker Image</th>
            <th>User id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Deleted</th>
            <th>Deleted at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {markers.map((marker) => (
            <tr key={marker.id}>
              <td>{truncate(marker.id)}</td>
              <td>{truncate(marker.url)}</td>
              <td><img src={marker.url} /></td>
              <td>{truncate(marker.userId)}</td>
              <td>{formatDatetime(marker.createdAt)}</td>
              <td>{formatDatetime(marker.updatedAt)}</td>
              <td>{checkboxInputTag(marker.deleted)}</td>
              <td>{formatDatetime(marker.deletedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminMarker({ id: marker.id })}
                    title={"Show marker " + marker.id + " detail"}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditMarker({ id: marker.id })}
                    title={"Edit marker " + marker.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={"Delete marker " + marker.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(marker.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkersList;
