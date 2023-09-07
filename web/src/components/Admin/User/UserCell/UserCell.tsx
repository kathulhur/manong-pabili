import type { FindUserById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import User from "src/components/Admin/User/User";
import { Link, routes } from "@redwoodjs/router";

export const QUERY = gql`
  query FindUserById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>User not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ user }: CellSuccessProps<FindUserById>) => {

  return (
    <>
      <div className="m-2 flex justify-between">
        <div className="text-xl font-semibold space-x-2">
          <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
            Users
          </Link>
          <span>&gt;</span>
          <Link to={routes.adminUser({ id: user.id })} className="hover:underline hover:underline-offset-1">
            { user.name }
          </Link>
        </div>
        <Link to={routes.adminUser({ id: user.id })} className="flex items-center font-semibold border px-4 py-2 rounded-md">
          <div className="rw-button-icon">+</div> Add Product
        </Link>
      </div>
      <User user={user} />
    </>
  );
};
