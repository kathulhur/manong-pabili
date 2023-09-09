import type { FindUserById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import User from "src/components/Admin/User/User";
import { Link, routes } from "@redwoodjs/router";
import LoadingComponent from "src/components/Loading/Loading";
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
      createdAt
      updatedAt
      deletedAt
      deleted
    }

  }
`;

export const Loading = () => null;

export const Empty = () => <div>User not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ user }: CellSuccessProps<FindUserById>) => {

  return (
    <div className="m-8">
      <div>
        <div className="font-semibold space-x-2">
          <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
            Users
          </Link>
          <span>&gt;</span>
          <Link to={routes.adminUser({ id: user.id })} className="hover:underline hover:underline-offset-1">
            { user.name }
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <User user={user} />
      </div>
    </div>
  );
};
