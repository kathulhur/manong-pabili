import type { FindUsers } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Users from "src/components/Admin/User/Users";
import Pagination from "src/components/Pagination/Pagination";

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, 10) : 1
  return { variables: { page } }
}

export const QUERY = gql`
  query FindUsers($page: Int) {
    userPage (page: $page){
      users {
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
      count
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {"No users yet. "}
      {/* <Link to={routes.adminNewUser()} className="rw-link">
        {"Create one?"}
      </Link> */}
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export interface UsersCellSuccessProps extends CellSuccessProps<FindUsers> {
  paginate: (page: number) => string;
}

export const Success = ({ userPage: { users, count }, paginate }: UsersCellSuccessProps) => {
  return (
    <div>
      <Users users={users}/>
      <Pagination count={count} paginate={paginate}/>
    </div>);
};
