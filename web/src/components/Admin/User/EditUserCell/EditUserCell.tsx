import type { EditUserById, UpdateUserInput } from "types/graphql";

import { Link, navigate, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import UserForm from "src/components/Admin/User/UserForm";

export const QUERY = gql`
  query EditUserById($id: Int!) {
    user: user(id: $id) {
      id
      email
      username
      name
      gender
      mobileNumber
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
      latitude
      longitude
      roles
      lastLocationUpdate
      locationHidden
      verified
      markerUrl
      deleted
      deletedAt
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      username
      name
      gender
      mobileNumber
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
      latitude
      longitude
      roles
      lastLocationUpdate
      locationHidden
      verified
      markerUrl
      deleted
      deletedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ user }: CellSuccessProps<EditUserById>) => {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success("User updated");
      navigate(routes.adminUsers());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateUserInput, id: EditUserById["user"]["id"]) => {
    updateUser({ variables: { id, input } });
  };

  return (
    <>
    <div className="m-2">
      <div className="text-xl font-semibold space-x-2">
        <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
          Users
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminUsers({ id: user.id })} className="hover:underline hover:underline-offset-1">
          Users
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminUser({ id: user.id })} className="hover:underline hover:underline-offset-1">
          { user.name }
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminEditUser({ id: user.id })} className="hover:underline hover:underline-offset-1">
          Edit
        </Link>
      </div>
    </div>
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit User {user?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserForm user={user} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
    </>
  );
};
