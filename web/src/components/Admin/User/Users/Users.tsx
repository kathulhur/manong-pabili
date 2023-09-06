import { Link, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { QUERY } from "src/components/Admin/User/UsersCell";
import { checkboxInputTag, timeTag, truncate } from "src/lib/formatters";

import type { DeleteUserMutationVariables, FindUsers } from "types/graphql";

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const UsersList = ({ users, queryVariables }: {
  users: FindUsers['userPage']['users'],
  queryVariables: any
}) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success("User deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    update: (cache, { data: { deleteUser } }) => {
      const deletedUserId = deleteUser?.id;
      cache.modify({
        fields: {
          userPage: (existingUserPage: FindUsers['userPage'], { readField }): FindUsers['userPage'] => {
            return {
              ...existingUserPage,
              users: existingUserPage.users.filter(
                (user) => deletedUserId !== readField("id", user),
              ),
              count: existingUserPage.count - 1,
            };
          },
        },
      });
    }
  });

  const onDeleteClick = (id: DeleteUserMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete user " + id + "?")) {
      deleteUser({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Username</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Mobile number</th>
            <th>Hashed password</th>
            <th>Salt</th>
            <th>Reset token</th>
            <th>Reset token expires at</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Roles</th>
            <th>Last location update</th>
            <th>Location hidden</th>
            <th>Verified</th>
            <th>Marker url</th>
            <th>Deleted</th>
            <th>Deleted at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{truncate(user.id)}</td>
              <td>{truncate(user.email)}</td>
              <td>{truncate(user.username)}</td>
              <td>{truncate(user.name)}</td>
              <td>{truncate(user.gender)}</td>
              <td>{truncate(user.mobileNumber)}</td>
              <td>{truncate(user.hashedPassword)}</td>
              <td>{truncate(user.salt)}</td>
              <td>{truncate(user.resetToken)}</td>
              <td>{timeTag(user.resetTokenExpiresAt)}</td>
              <td>{truncate(user.latitude)}</td>
              <td>{truncate(user.longitude)}</td>
              <td>{truncate(user.roles)}</td>
              <td>{timeTag(user.lastLocationUpdate)}</td>
              <td>{checkboxInputTag(user.locationHidden)}</td>
              <td>{checkboxInputTag(user.verified)}</td>
              <td>{truncate(user.markerUrl)}</td>
              <td>{checkboxInputTag(user.deleted)}</td>
              <td>{timeTag(user.deletedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminUser({ id: user.id })}
                    title={"Show user " + user.id + " detail"}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditUser({ id: user.id })}
                    title={"Edit user " + user.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={"Delete user " + user.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(user.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={routes.userProducts({ page: 1, userId: user.id })}
                    title={"Edit user " + user.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    view products
                  </Link>
                  <Link
                    to={routes.userImages({ page: 1, userId: user.id })}
                    title={"Edit user " + user.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    view featured images
                  </Link>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
