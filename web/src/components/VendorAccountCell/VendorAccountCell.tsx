import { Link, routes } from "@redwoodjs/router";
import { MetaTags, useMutation } from "@redwoodjs/web";
import { useState } from "react";
import ChangePasswordModal from "src/components/Modals/ChangePasswordModal";
import DeleteAccountModal from "src/components/Modals/DeleteAccountModal";
import UpdateMobileNumberModal from "src/components/Modals/UpdateMobileNumberModal";
import UpdateNameModal from "src/components/Modals/UpdateNameModal";
import UpdateUsernameModal from "src/components/Modals/UpdateUsernameModal";

import type {
  FindVendorAccountQuery,
  FindVendorAccountQueryVariables,
  UpdateUsernameMutation,
  UpdateUsernameMutationVariables,
  UpdateNameMutation,
  UpdateNameMutationVariables,
  UpdateMobileNumberMutation,
  UpdateMobileNumberMutationVariables,
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,
} from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";


export const QUERY = gql`
  query FindVendorAccountQuery($userId: Int!) {
    vendorAccount: user(id: $userId) {
      id
      username
      name
      mobileNumber
    }
  }
`;

const UPDATE_USERNAME_MUTATION = gql`
  mutation UpdateUsernameMutation($id: Int!, $username: String!) {
    updateUser(id: $id, input: { username: $username }) {
      id
      username
    }
  }
`;

const UPDATE_NAME_MUTATION = gql`
  mutation UpdateNameMutation($id: Int!, $name: String!) {
    updateUser(id: $id, input: { name: $name }) {
      id
      name
    }
  }
`;

const UPDATE_MOBILE_NUMBER_MUTATION = gql`
  mutation UpdateMobileNumberMutation($id: Int!, $mobileNumber: String!) {
    updateUser(id: $id, input: { mobileNumber: $mobileNumber }) {
      id
      mobileNumber
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation UpdateUserPasswordMutation($id: Int!, $oldPassword: String!, $newPassword: String!) {
    updateUserPassword(id: $id, input: { oldPassword: $oldPassword, newPassword: $newPassword }) {
      id
    }
  }
`;



export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindVendorAccountQueryVariables>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({
  vendorAccount,
}: CellSuccessProps<
  FindVendorAccountQuery,
  FindVendorAccountQueryVariables
>) => {
  const [updateUsername] = useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UPDATE_USERNAME_MUTATION);
  const [updateName] = useMutation<UpdateNameMutation, UpdateNameMutationVariables>(UPDATE_NAME_MUTATION);
  const [updateMobileNumber] = useMutation<UpdateMobileNumberMutation, UpdateMobileNumberMutationVariables>(UPDATE_MOBILE_NUMBER_MUTATION);
  const [updateUserPasswordMutation] = useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(CHANGE_PASSWORD_MUTATION);

  const [isUpdateUsernameModalOpen, setIsUpdateUsernameModalOpen] = useState(false);
  const [isUpdateNameModalOpen, setIsUpdateNameModalOpen] = useState(false);
  const [isUpdateMobileNumberModalOpen, setIsUpdateMobileNumberModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  const onSubmitUsername = async (username: string) => {
    try {
      await updateUsername({
        variables: {
          id: vendorAccount?.id,
          username,
        },
        refetchQueries: [QUERY],
        onCompleted: () => {
          setIsUpdateUsernameModalOpen(false);
          alert('Username updated successfully');
        },
        onError: (err) => {
          alert(err.message);
        },

      });

      // TODO: find a way to refresh the current user (perhaps we can just create a cell for this instead)
    } catch (err) {
      alert(err.message)
    }
  }

  const onSubmitName = async (name) => {
    try {
      await updateName({
        variables: {
          id: vendorAccount?.id,
          name,
        },
        refetchQueries: [QUERY],
        onCompleted: () => {
          setIsUpdateNameModalOpen(false);
          alert('Name updated successfully');
        },
        onError: (err) => {
          alert(err.message);
        },

      });
    } catch (err) {
      alert(err.message)
    }
  }

  const onSubmitMobileNumber = (mobileNumber: string) => {
    try {
      updateMobileNumber({
        variables: {
          id: vendorAccount?.id,
          mobileNumber,
        },
        refetchQueries: [QUERY],
        onCompleted: () => {
          setIsUpdateMobileNumberModalOpen(false);
          alert('Mobile Number updated successfully');
        },
        onError: (err) => {
          alert(err.message);
        },

      });
    } catch (err) {
      alert(err.message)
    }
  }

  const updateUserPasswordHandler = async (oldPassword: string, newPassword: string) => {
    try {
      await updateUserPasswordMutation({
        variables: {
          id: vendorAccount?.id,
          newPassword,
          oldPassword
        },
        refetchQueries: [QUERY],
        onCompleted: () => {
          setIsChangePasswordModalOpen(false);
          alert('Password updated successfully');

        }
      });
    } catch (e) {
      alert('Error updating password');
    }
  }


  const onDeleteAccount = async (password: String) => {
    // TODO: delete account
  }




  return (
    <div className="space-y-16">
      <h2
        className="text-2xl font-bold"
      >
        Your Profile
      </h2>

      <div
        className="flex space-x-8 justify-between items-center mt-4"
      >
        <div>
          <h2 className="text-sm">Username</h2>
          <p className="text-xl font-bold">{vendorAccount?.username}</p>
        </div>
        <button
          className="border py-2 px-4 rounded-md"
          onClick={() => setIsUpdateUsernameModalOpen(true)}>
          Update
        </button>
        <UpdateUsernameModal
          isOpen={isUpdateUsernameModalOpen}
          onClose={() => setIsUpdateUsernameModalOpen(false)}
          onSubmit={onSubmitUsername}
        />
      </div>
      <div
        className="flex space-x-8 justify-between items-center"
      >
        <div>
          <h2 className="text-sm">Fullname</h2>
          <p className="text-xl font-bold">{vendorAccount?.name}</p>
        </div>
        <button
          className="border py-2 px-4 rounded-md"
          onClick={() => setIsUpdateNameModalOpen(true)}
        >
          Update
        </button>
        <UpdateNameModal
          isOpen={isUpdateNameModalOpen}
          onClose={() => setIsUpdateNameModalOpen(false)}
          onSubmit={onSubmitName}
        />
      </div>
      <div
        className="flex space-x-8 justify-between items-center"
      >
        <div>
          <h2 className="text-sm">Mobile Number</h2>
          <p className="text-xl font-bold">{vendorAccount?.mobileNumber}</p>
        </div>
        <button
          className="border py-2 px-4 rounded-md"
          onClick={() => setIsUpdateMobileNumberModalOpen(true)}
        >
          Update
        </button>
        <UpdateMobileNumberModal
          isOpen={isUpdateMobileNumberModalOpen}
          onClose={() => setIsUpdateMobileNumberModalOpen(false)}
          onSubmit={onSubmitMobileNumber}
        />
      </div>
      <div className="">
        <button className="w-full border py-2 px-4 rounded-md"
          onClick={() => setIsChangePasswordModalOpen(true)}
        >
          Change Password
        </button>
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
          onSubmit={updateUserPasswordHandler}
        />
      </div>

      <div className="mt-32">
        <p>
          Danger Zone
        </p>
        <button className="w-full border py-2 px-4 rounded-md"
          onClick={() => setIsDeleteAccountModalOpen(true)}
        >
          Delete Account
        </button>
        <DeleteAccountModal
          isOpen={isDeleteAccountModalOpen}
          onClose={() => setIsDeleteAccountModalOpen(false)}
          onSubmit={onDeleteAccount}
        />
      </div>
    </div>
  );
};
