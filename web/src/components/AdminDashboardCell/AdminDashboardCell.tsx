import type {
  FindAdminDashboardQuery,
  FindAdminDashboardQueryVariables,
  DeleteVendorMutation,
  DeleteVendorMutationVariables
} from "types/graphql";
import { type CellSuccessProps, type CellFailureProps, useMutation } from "@redwoodjs/web";
import { useAuth } from "src/auth";
import { Link } from "@redwoodjs/router";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import useLogout from "src/hooks/useLogout";

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, 10): 1

  return { variables: { page }}
}

export const QUERY = gql`
  query FindAdminDashboardQuery($page: Int) {
    vendorPage(page: $page) {
      vendors {
        id,
        name,
        username,
        mobileNumber,
        roles,
        latitude,
        longitude,
      }
      count
    }
  }
`;

export const DELETE_VENDOR_MUTATION = gql`
  mutation DeleteVendorMutation($id: Int!) {
    deleteUser(id: $id) {
      id
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

  const { currentUser } = useAuth()
  const logOut = useLogout();
  const [deleteVendor] = useMutation<DeleteVendorMutation, DeleteVendorMutationVariables>(DELETE_VENDOR_MUTATION)
  const [vendorUpdateModalOpen, setVendorUpdateModalOpen] = useState(false)
  const handleVendorDelete = async (id: number) => {
    try {
      await deleteVendor({ variables: { id },
        refetchQueries: [{ query: QUERY, variables: { page: 1 } }],
        onError: (error) => {
          alert(`Error deleting vendor ${id}: ${error.message}`)
        },
        onCompleted: () => {
          alert("Vendor deleted successfully")
        }})
    } catch (err) {
      console.error(err)
      alert(`Error deleting vendor ${id}: ${err.message}`)
    }
  }


  return <div>
    <button onClick={ logOut }>Logout</button>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Fullname</td>
            <td>Username</td>
            <td>Mobile Number</td>
            <td>Gender</td>
            <td>Coordinates</td>
            <td>Role</td>
            <td>Products</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor?.id}</td>
              <td>{vendor?.name}</td>
              <td>{vendor?.username}</td>
              <td>{vendor?.mobileNumber}</td>
              <td>{"GENDER"}</td>
              <td>
                <p>Latitude: {vendor.latitude}</p>
                <p>Longitude: {vendor.longitude}</p>
              </td>
              <td>{vendor?.roles}</td>
              <td>
                <Link to={"."}>View Products</Link>
              </td>
              <td>
                <div>
                  <button onClick={() => vendorUpdateModalOpen}>Update</button>
                  <button onClick={() => handleVendorDelete(vendor.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
  </div>;
};
