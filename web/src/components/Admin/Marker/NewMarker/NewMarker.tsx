import { navigate, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import MarkerForm from "src/components/Admin/Marker/MarkerForm";

import type { CreateMarkerInput } from "types/graphql";

const CREATE_MARKER_MUTATION = gql`
  mutation CreateMarkerMutation($input: CreateMarkerInput!) {
    createMarker(input: $input) {
      id
    }
  }
`;

const NewMarker = () => {
  const [createMarker, { loading, error }] = useMutation(
    CREATE_MARKER_MUTATION,
    {
      onCompleted: () => {
        toast.success("Marker created");
        navigate(routes.adminMarkers());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateMarkerInput) => {
    createMarker({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Marker</h2>
      </header>
      <div className="rw-segment-main">
        <MarkerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewMarker;
