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
  DeleteAccountMutation,
  DeleteAccountMutationVariables,
  UploadImageMutation,
  UploadImageMutationVariables,
  DeleteImageMutation,
  DeleteImageMutationVariables
} from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { Form, FormError } from "@redwoodjs/forms";
import { useAuth } from "src/auth";
import ImageForm, { ImageFormProps } from "../ImageForm/ImageForm";
import { toast } from "@redwoodjs/web/dist/toast";


export const QUERY = gql`
  query FindVendorAccountQuery($userId: Int!) {
    vendorAccount: vendor(id: $userId) {
      id
      username
      name
      mobileNumber
      featuredImages {
        id
        title
        url
      }
    }
  }
`;

const UPDATE_USERNAME_MUTATION = gql`
  mutation UpdateUsernameMutation($id: Int!, $username: String!) {
    updateUsername(id: $id, input: { updatedUsername: $username }) {
      id
      username
    }
  }
`;

const UPDATE_NAME_MUTATION = gql`
  mutation UpdateNameMutation($id: Int!, $name: String!) {
    updateName(id: $id, input: { updatedName: $name }) {
      id
      name
    }
  }
`;

const UPDATE_MOBILE_NUMBER_MUTATION = gql`
  mutation UpdateMobileNumberMutation($id: Int!, $mobileNumber: String!) {
    updateMobileNumber(id: $id, input: { updatedMobileNumber: $mobileNumber }) {
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

const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccountMutation($id: Int!, $password: String!) {
    deleteUserAccount(id: $id, input: { password: $password }) {
      id
    }
  }
`;

const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImageMutation($input: CreateImageInput!) {
    createImage(input: $input) {
      id
    }
  }
`;

const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
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
  const { logOut } = useAuth();
  const [updateUsername] = useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UPDATE_USERNAME_MUTATION);
  const [updateName] = useMutation<UpdateNameMutation, UpdateNameMutationVariables>(UPDATE_NAME_MUTATION);
  const [updateMobileNumber] = useMutation<UpdateMobileNumberMutation, UpdateMobileNumberMutationVariables>(UPDATE_MOBILE_NUMBER_MUTATION);
  const [updateUserPasswordMutation, { error }] = useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(CHANGE_PASSWORD_MUTATION);
  const [deleteUserAccount] = useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DELETE_ACCOUNT_MUTATION);

  const [uploadImage, { loading: imageUploading, error: imageUploadError }] = useMutation<UploadImageMutation, UploadImageMutationVariables>(UPLOAD_IMAGE_MUTATION);
  const [deleteImage, { loading: imageDeleteLoading }] = useMutation<DeleteImageMutation, DeleteImageMutationVariables>(DELETE_IMAGE_MUTATION);

  const [isUpdateUsernameModalOpen, setIsUpdateUsernameModalOpen] = useState(false);
  const [isUpdateNameModalOpen, setIsUpdateNameModalOpen] = useState(false);
  const [isUpdateMobileNumberModalOpen, setIsUpdateMobileNumberModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [isUploadFeatureImageModalOpen, setIsUploadFeatureImageModalOpen] = useState(false);
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
          alert(err);
        },

      });

    } catch (err) {
      alert(err)
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
        onError: (err) => {
          err.graphQLErrors.forEach((error) => {
            alert(error.message);
          })

        },
        onCompleted: () => {
          setIsChangePasswordModalOpen(false);
          alert('Password updated successfully');

        }
      });
    } catch (e) {
      console.log('exception', e)

    }
  }


  const onDeleteAccount = async (password: string) => {
    try {
      await deleteUserAccount({
        variables: {
          id: vendorAccount.id,
          password
        },
        refetchQueries: [QUERY],
        onCompleted: () => {
          setIsDeleteAccountModalOpen(false);
          alert('Account deleted successfully');
          logOut();
        },
        onError: (err) => {
          err.graphQLErrors.forEach((error) => {
            alert(error.message);
          })
        },

      });

    } catch (err) {
      alert(err.message)
    }

  }


  const uploadImageHandler: ImageFormProps['onSave'] = async (data) => {
    if (vendorAccount.featuredImages.length == 2) {
      toast.error('You can only upload up to two photos. Please delete one of your existing photos to upload a new one');
      return;
    }
    try {
      await uploadImage({
        variables: {
          input: {
            title: data.title,
            url: data.url,
            userId: vendorAccount?.id
          }
        },
        refetchQueries: [QUERY],
        onCompleted: () => {
          toast.success('Image uploaded successfully');
        },
        onError: (err) => {
          console.log(err);
          toast.error('Image upload failed');
        },

      });
    } catch (err) {
      alert(err.message)
    }
  }

  const deleteImageHandler = async (id: number) => {
    try {
      await deleteImage({
        variables: {
          id
        },
        refetchQueries: [QUERY],
        onCompleted: () => {
          toast.success('Image deleted successfully');
        },
        onError: (err) => {
          console.log(err);
          toast.error('Image delete failed');
        },

      });
    } catch (err) {
      alert(err.message)
    }
  }




  return (
    <div className="space-y-16">
      <p></p>
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

      <div>
        <div className="flex justify-between mb-4">
          <div>
            <h2>Featured Images</h2>
            <p>This shows up in the popover when user clicks on your map marker</p>
            <p>Note: You can only upload up to two photos</p>
          </div>
          <button
            className="border py-2 px-4 rounded-md disabled:opacity-50"
            onClick={() => setIsUploadFeatureImageModalOpen(true)}
            disabled={vendorAccount?.featuredImages?.length == 2}
          >
            Add Featured Image
          </button>
        </div>
        <div className="flex space-x-8">
          {vendorAccount?.featuredImages?.map((image) => (
            <div key={image.id} className="space-x-4 items-center">
              <img src={image.url} alt={image.title} className=" object-scale-down" />
              <div className="flex justify-between">
                <p>{image.title}</p>
                <button
                  className="border py-2 px-4 rounded-md"
                  onClick={() => deleteImageHandler(image.id)}
                  disabled={imageDeleteLoading}
                >Delete</button>
              </div>
            </div>
          ))}
        { vendorAccount?.featuredImages.length < 2 &&
          <ImageForm
            onSave={uploadImageHandler}
            error={imageUploadError}
            image={null}
            loading={imageUploading}
            isOpen={isUploadFeatureImageModalOpen}
            onClose={() => setIsUploadFeatureImageModalOpen(false)}
          />
        }
        </div>
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
