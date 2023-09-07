import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import {} from "src/lib/formatters";

import type {
  DeleteImageMutationVariables,
  FindImageById,
} from "types/graphql";

const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`;

interface Props {
  image: NonNullable<FindImageById["image"]>;
}

const Image = ({ image }: Props) => {
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success("Image deleted");
      navigate(routes.adminImages());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteImageMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete image " + id + "?")) {
      deleteImage({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Image {image.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{image.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{image.title}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{image.url}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{image.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditImage({ id: image.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(image.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Image;
