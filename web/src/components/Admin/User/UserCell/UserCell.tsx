import type { FindUserById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import User from "src/components/Admin/User/User";

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
  return <User user={user} />;
};
