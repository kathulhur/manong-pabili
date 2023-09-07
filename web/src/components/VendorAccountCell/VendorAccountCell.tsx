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
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import FeaturedImage from "../FeaturedImage/FeaturedImage";


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
      title
      url
      userId
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
        onCompleted: () => {
          setIsUpdateUsernameModalOpen(false);
          toast.success('Username updated successfully');
        },
        onError: (err) => {
          toast.error(err.message);
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
        onCompleted: () => {
          setIsUpdateNameModalOpen(false);
          toast.success('Name updated successfully');
        },
        onError: (err) => {
          toast.error(err.message);
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
        onCompleted: () => {
          setIsUpdateMobileNumberModalOpen(false);
          toast.success('Mobile Number updated successfully');
        },
        onError: (err) => {
          toast.error(err.message);
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
        onError: (err) => {
          err.graphQLErrors.forEach((error) => {
            toast.error(error.message);
          })

        },
        onCompleted: () => {
          setIsChangePasswordModalOpen(false);
          toast.success('Password updated successfully');

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
        onCompleted: () => {
          setIsDeleteAccountModalOpen(false);
          toast.success('Account deleted successfully');
          logOut();
        },
        onError: (err) => {
          err.graphQLErrors.forEach((error) => {
            toast.error(error.message);
          })
        },

      });

    } catch (err) {
      toast.error(err.message)
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
        onCompleted: () => {
          toast.success('Image uploaded successfully');
          setIsUploadFeatureImageModalOpen(false);
        },
        onError: (err) => {
          console.log(err);
          toast.error('Image upload failed');
        },
        update: (cache, { data }) => {
          const newImage = data?.createImage
          if (newImage) {
            cache.modify({
              id: cache.identify({ __typename: 'User', id: vendorAccount.id }), // Identify the vendor object
              fields: {
                featuredImages: (existingImagesRefs = [], { readField }) => {
                  const newImageRef = cache.writeFragment({
                    data: newImage,
                    fragment: gql`
                      fragment NewImage on Image {
                        id
                        title
                        url
                      }
                    `,
                  });
                  return [...existingImagesRefs, newImageRef];
                },
              },
            });
          }
        }
      });
    } catch (err) {
      alert(err.message)
    }
  }

  const deleteImageHandler = async (id: number) => {
    try {
      if (confirm('Are you sure you want to delete this image?') === true) {
        await deleteImage({
          variables: {
            id
          },
          onCompleted: () => {
            toast.success('Image deleted successfully');
          },
          onError: (err) => {
            console.log(err);
            toast.error('Image delete failed');
          },
          update: (cache, { data }) => {
            const deletedImageId = data?.deleteImage?.id
            if (deletedImageId) {
              cache.modify({
                id: cache.identify({ __typename: 'User', id: vendorAccount.id }), // Identify the vendor object
                fields: {
                  featuredImages: (existingImagesRefs, { readField }) => {
                    return existingImagesRefs.filter(
                      (imageRef) => deletedImageId !== readField('id', imageRef)
                    )
                  },
                },
              })
            }
          }

        });
      }
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
          defaultValue={vendorAccount?.mobileNumber}
          isOpen={isUpdateMobileNumberModalOpen}
          onClose={() => setIsUpdateMobileNumberModalOpen(false)}
          onSubmit={onSubmitMobileNumber}
        />
      </div>

      <div>
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Featured Images</h2>
            <div className="text-sm">
              <p>{'('}This shows up in the popover when user clicks on your map marker{')'}</p>
              <p>Note: You can only upload up to two photos</p>
            </div>
          </div>
          <button
            className="border py-2 px-4 rounded-md disabled:opacity-50"
            onClick={() => setIsUploadFeatureImageModalOpen(true)}
            disabled={vendorAccount?.featuredImages?.length == 2}
          >
            <div className="flex items-center space-x-4">
              <PlusIcon className="w-4 h-4" />
              <span>
                Add Featured Image
              </span>
            </div>
          </button>
        </div>
        <div className="flex space-x-8">
          {vendorAccount?.featuredImages?.map((image) => (
            <FeaturedImage
              key={image.id}
              image={image}
              imageDeleteLoading={imageDeleteLoading}
              deleteImageHandler={deleteImageHandler}
            />
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
