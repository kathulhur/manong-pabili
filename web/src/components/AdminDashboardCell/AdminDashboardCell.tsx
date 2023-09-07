import type {
  FindAdminDashboardQuery,
  FindAdminDashboardQueryVariables,
  DeleteVendorMutation,
  DeleteVendorMutationVariables,
  VerifyVendorMutation,
  VerifyVendorMutationVariables
} from "types/graphql";
import { type CellSuccessProps, type CellFailureProps, useMutation } from "@redwoodjs/web";
import { useAuth } from "src/auth";
import { Link } from "@redwoodjs/router";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import useLogout from "src/hooks/useLogout";

export const beforeQuery = ({ page, searchKey }) => {
  page = page ? parseInt(page, 10): 1

  return { variables: { page, searchKey }}
}

export const QUERY = gql`
  query FindAdminDashboardQuery($page: Int, $searchKey: String) {
    vendorPage(page: $page, searchKey: $searchKey) {
      vendors {
        id,
        name,
        verified,
        username,
        mobileNumber,
        roles,
        latitude,
        longitude,
        lastLocationUpdate,
        locationHidden
      }
      count
    }
  }
`;

const VERIFY_VENDOR_MUTATION = gql`
  mutation VerifyVendorMutation($id: Int!, $input: UpdateUserInput!) {
    verifyVendor: updateUser(id: $id, input: $input) {
      id
    }
  }
`

const DELETE_VENDOR_MUTATION = gql`
  mutation DeleteVendorMutation($id: Int!) {
    deleteUser(id: $id) {
      id
      verified
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindAdminDashboardQueryVariables>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({
  vendorPage: { vendors, count }
}: CellSuccessProps<
  FindAdminDashboardQuery,
  FindAdminDashboardQueryVariables
>) => {

 return <>
    <h1>Admin DashboardCell</h1>
 </>
};
