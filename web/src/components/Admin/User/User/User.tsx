import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { checkboxInputTag, timeTag } from "src/lib/formatters";

import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  FindUserById
} from "types/graphql";

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

interface Props {
  user: NonNullable<FindUserById["user"]>;
}

const User = ({ user }: Props) => {
  const [deleteUser] = useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success("User deleted");
      navigate(routes.adminUsers());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteUserMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete user " + id + "?")) {
      deleteUser({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <th>Mobile number</th>
              <td>{user.mobileNumber}</td>
            </tr>
            <tr>
              <th>Hashed password</th>
              <td>{user.hashedPassword}</td>
            </tr>
            <tr>
              <th>Salt</th>
              <td>{user.salt}</td>
            </tr>
            <tr>
              <th>Reset token</th>
              <td>{user.resetToken}</td>
            </tr>
            <tr>
              <th>Reset token expires at</th>
              <td>{timeTag(user.resetTokenExpiresAt)}</td>
            </tr>
            <tr>
              <th>Latitude</th>
              <td>{user.latitude}</td>
            </tr>
            <tr>
              <th>Longitude</th>
              <td>{user.longitude}</td>
            </tr>
            <tr>
              <th>Roles</th>
              <td>{user.roles}</td>
            </tr>
            <tr>
              <th>Last location update</th>
              <td>{timeTag(user.lastLocationUpdate)}</td>
            </tr>
            <tr>
              <th>Location hidden</th>
              <td>{checkboxInputTag(user.locationHidden)}</td>
            </tr>
            <tr>
              <th>Verified</th>
              <td>{checkboxInputTag(user.verified)}</td>
            </tr>
            <tr>
              <th>Marker url</th>
              <td>{user.markerUrl}</td>
            </tr>
            <tr>
              <th>Deleted</th>
              <td>{checkboxInputTag(user.deleted)}</td>
            </tr>
            <tr>
              <th>Deleted at</th>
              <td>{timeTag(user.deletedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.userProducts({ page: 1, userId: user.id })}
          title={"Edit user " + user.id}
          className="rw-button rw-button-blue"
        >
          view products
        </Link>
        <Link
          to={routes.userImages({ page: 1, userId: user.id })}
          title={"Edit user " + user.id}
          className="rw-button rw-button-blue"
        >
          view featured images
        </Link>
        <Link
          to={routes.adminEditUser({ id: user.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(user.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default User;
