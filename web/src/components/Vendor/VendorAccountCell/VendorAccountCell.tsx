import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import ChangePasswordModal from 'src/components/Modals/ChangePasswordModal'
import DeleteAccountModal from 'src/components/Modals/DeleteAccountModal'
import UpdateMobileNumberModal from 'src/components/Modals/UpdateMobileNumberModal'
import UpdateNameModal from 'src/components/Modals/UpdateNameModal'
import UpdateUsernameModal from 'src/components/Modals/UpdateUsernameModal'

import {
    type FindVendorAccountQuery,
    type FindVendorAccountQueryVariables,
    type UpdateUsernameMutation,
    type UpdateUsernameMutationVariables,
    type UpdateNameMutation,
    type UpdateNameMutationVariables,
    type UpdateMobileNumberMutation,
    type UpdateMobileNumberMutationVariables,
    type UpdateUserPasswordMutation,
    type UpdateUserPasswordMutationVariables,
    type DeleteAccountMutation,
    type DeleteAccountMutationVariables,
    type UploadImageMutation,
    type UploadImageMutationVariables,
    type DeleteVendorImageMutation,
    type DeleteVendorImageMutationVariables,
    type DeleteVendorMarkerMutation,
    type DeleteVendorMarkerMutationVariables,
    type UpdateEmailMutation,
    type UpdateEmailMutationVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import ImageForm, {
    ImageFormProps,
} from 'src/components/Vendor/ImageForm/ImageForm'
import { toast } from '@redwoodjs/web/dist/toast'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import FeaturedImage from 'src/components/Vendor/FeaturedImage/FeaturedImage'
import Button from '../../Button/Button'
import UpdateEmailModal from '../../Modals/UpdateEmailModal'
import Skeleton from 'src/components/Skeleton/Skeleton'
import ConfirmationModal from 'src/components/Modals/ConfirmationModal'

export const QUERY = gql`
    query FindVendorAccountQuery($userId: Int!) {
        vendorAccount: vendor(id: $userId) {
            id
            username
            name
            email
            mobileNumber
            lastLocationUpdate
            featuredImages {
                id
                title
                url
            }
            Markers {
                id
                url
            }
        }
    }
`

export const DELETE_VENDOR_IMAGE_MUTATION = gql`
    mutation DeleteVendorImageMutation($id: Int!) {
        softDeleteImage(id: $id) {
            id
        }
    }
`

const DELETE_MARKER_MUTATION = gql`
    mutation DeleteVendorMarkerMutation($id: Int!) {
        softDeleteMarker(id: $id) {
            id
        }
    }
`

export const UPDATE_USERNAME_MUTATION = gql`
    mutation UpdateUsernameMutation($id: Int!, $username: String!) {
        updateUsername(id: $id, input: { updatedUsername: $username }) {
            id
            username
        }
    }
`

export const UPDATE_NAME_MUTATION = gql`
    mutation UpdateNameMutation($id: Int!, $name: String!) {
        updateName(id: $id, input: { updatedName: $name }) {
            id
            name
        }
    }
`

export const UPDATE_MOBILE_NUMBER_MUTATION = gql`
    mutation UpdateMobileNumberMutation($id: Int!, $mobileNumber: String!) {
        updateMobileNumber(
            id: $id
            input: { updatedMobileNumber: $mobileNumber }
        ) {
            id
            mobileNumber
        }
    }
`

export const UPDATE_EMAIL_MUTATION = gql`
    mutation UpdateEmailMutation($id: Int!, $email: String!) {
        updateEmail(id: $id, input: { updatedEmail: $email }) {
            id
            email
        }
    }
`

const CHANGE_PASSWORD_MUTATION = gql`
    mutation UpdateUserPasswordMutation(
        $id: Int!
        $oldPassword: String!
        $newPassword: String!
    ) {
        updateUserPassword(
            id: $id
            input: { oldPassword: $oldPassword, newPassword: $newPassword }
        ) {
            id
        }
    }
`

const DELETE_ACCOUNT_MUTATION = gql`
    mutation DeleteAccountMutation($id: Int!, $password: String!) {
        deleteUserAccount(id: $id, input: { password: $password }) {
            id
        }
    }
`

const UPLOAD_IMAGE_MUTATION = gql`
    mutation UploadImageMutation($input: CreateImageInput!) {
        createImage(input: $input) {
            id
            title
            url
            userId
        }
    }
`

export const Loading = () => (
    <Skeleton>
        <Skeleton.Rectangle width={180} className="mb-8" />
        <Skeleton.Rectangle width={120} height={20} className="mb-2" />
        <Skeleton.Rectangle width={240} height={28} className="mb-4" />
        <Skeleton.Rectangle width={120} height={20} className="mb-2" />
        <Skeleton.Rectangle width={240} height={28} className="mb-4" />
        <Skeleton.Rectangle width={120} height={20} className="mb-2" />
        <Skeleton.Rectangle width={240} height={28} className="mb-4" />
        <Skeleton.Rectangle width={120} height={20} className="mb-2" />
        <Skeleton.Rectangle width={240} height={28} className="mb-8" />
        <Skeleton.Rectangle width={240} height={20} className="mb-2" />
        <Skeleton.Rectangle height={100} className="mb-8" />
    </Skeleton>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<FindVendorAccountQueryVariables>) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
    vendorAccount,
}: CellSuccessProps<
    FindVendorAccountQuery,
    FindVendorAccountQueryVariables
>) => {
    const { logOut } = useAuth()
    const [updateUsername] = useMutation<
        UpdateUsernameMutation,
        UpdateUsernameMutationVariables
    >(UPDATE_USERNAME_MUTATION)
    const [updateName] = useMutation<
        UpdateNameMutation,
        UpdateNameMutationVariables
    >(UPDATE_NAME_MUTATION)
    const [updateMobileNumber] = useMutation<
        UpdateMobileNumberMutation,
        UpdateMobileNumberMutationVariables
    >(UPDATE_MOBILE_NUMBER_MUTATION)
    const [updateEmail] = useMutation<
        UpdateEmailMutation,
        UpdateEmailMutationVariables
    >(UPDATE_EMAIL_MUTATION)
    const [updateUserPasswordMutation, { error }] = useMutation<
        UpdateUserPasswordMutation,
        UpdateUserPasswordMutationVariables
    >(CHANGE_PASSWORD_MUTATION)
    const [deleteUserAccount] = useMutation<
        DeleteAccountMutation,
        DeleteAccountMutationVariables
    >(DELETE_ACCOUNT_MUTATION)

    const [uploadImage, { loading: imageUploading, error: imageUploadError }] =
        useMutation<UploadImageMutation, UploadImageMutationVariables>(
            UPLOAD_IMAGE_MUTATION
        )
    const [deleteImage, { loading: imageDeleteLoading }] = useMutation<
        DeleteVendorImageMutation,
        DeleteVendorImageMutationVariables
    >(DELETE_VENDOR_IMAGE_MUTATION)
    const [deleteMarker, { loading: deleteMarkerLoading }] = useMutation<
        DeleteVendorMarkerMutation,
        DeleteVendorMarkerMutationVariables
    >(DELETE_MARKER_MUTATION)
    const [isUpdateUsernameModalOpen, setIsUpdateUsernameModalOpen] =
        useState(false)
    const [isUpdateNameModalOpen, setIsUpdateNameModalOpen] = useState(false)
    const [isUpdateMobileNumberModalOpen, setIsUpdateMobileNumberModalOpen] =
        useState(false)
    const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] = useState(false)
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
        useState(false)
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
        useState(false)
    const [isUploadFeatureImageModalOpen, setIsUploadFeatureImageModalOpen] =
        useState(false)
    const [isDeleteMarkerModalOpen, setIsDeleteMarkerModalOpen] =
        useState(false)
    const onSubmitUsername = async (username: string) => {
        try {
            await updateUsername({
                variables: {
                    id: vendorAccount?.id,
                    username,
                },
                onCompleted: () => {
                    setIsUpdateUsernameModalOpen(false)
                    toast.success('Username updated successfully')
                },
                onError: (err) => {
                    toast.error(err.message)
                },
            })
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
                    setIsUpdateNameModalOpen(false)
                    toast.success('Name updated successfully')
                },
                onError: (err) => {
                    toast.error(err.message)
                },
            })
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
                    setIsUpdateMobileNumberModalOpen(false)
                    toast.success('Mobile Number updated successfully')
                },
                onError: (err) => {
                    toast.error(err.message)
                },
            })
        } catch (err) {
            alert(err.message)
        }
    }

    const onSubmitEmail = (email: string) => {
        try {
            updateEmail({
                variables: {
                    id: vendorAccount?.id,
                    email,
                },
                onCompleted: () => {
                    setIsUpdateEmailModalOpen(false)
                    toast.success('Email updated successfully')
                },
                onError: (err) => {
                    toast.error(err.message)
                },
            })
        } catch (err) {
            alert(err.message)
        }
    }

    const updateUserPasswordHandler = async (
        oldPassword: string,
        newPassword: string
    ) => {
        try {
            await updateUserPasswordMutation({
                variables: {
                    id: vendorAccount?.id,
                    newPassword,
                    oldPassword,
                },
                onError: (err) => {
                    err.graphQLErrors.forEach((error) => {
                        toast.error(error.message)
                    })
                },
                onCompleted: () => {
                    setIsChangePasswordModalOpen(false)
                    toast.success('Password updated successfully')
                },
            })
        } catch (e) {}
    }

    const onDeleteAccount = async (password: string) => {
        try {
            await deleteUserAccount({
                variables: {
                    id: vendorAccount.id,
                    password,
                },
                onCompleted: () => {
                    setIsDeleteAccountModalOpen(false)
                    toast.success('Account deleted successfully')
                    logOut()
                },
                onError: (err) => {
                    err.graphQLErrors.forEach((error) => {
                        toast.error(error.message)
                    })
                },
            })
        } catch (err) {
            toast.error(err.message)
        }
    }

    const uploadImageHandler: ImageFormProps['onSave'] = async (data) => {
        if (vendorAccount.featuredImages.length == 2) {
            toast.error(
                'You can only upload up to two photos. Please delete one of your existing photos to upload a new one'
            )
            return
        }
        try {
            await uploadImage({
                variables: {
                    input: {
                        title: data.title,
                        url: data.url,
                        userId: vendorAccount?.id,
                    },
                },
                onCompleted: () => {
                    toast.success('Image uploaded successfully')
                    setIsUploadFeatureImageModalOpen(false)
                },
                onError: (err) => {
                    toast.error('Image upload failed')
                },
                update: (cache, { data }) => {
                    const newImage = data?.createImage
                    if (newImage) {
                        cache.modify({
                            id: cache.identify({
                                __typename: 'User',
                                id: vendorAccount.id,
                            }), // Identify the vendor object
                            fields: {
                                featuredImages: (
                                    existingImagesRefs = [],
                                    { readField }
                                ) => {
                                    const newImageRef = cache.writeFragment({
                                        id:
                                            newImage.__typename +
                                            ':' +
                                            newImage.id,
                                        data: newImage,
                                        fragment: gql`
                                            fragment NewImage on Image {
                                                id
                                                title
                                                url
                                            }
                                        `,
                                    })
                                    return [...existingImagesRefs, newImageRef]
                                },
                            },
                        })
                    }
                },
            })
        } catch (err) {
            alert(err.message)
        }
    }

    const deleteImageHandler = async (id: number) => {
        try {
            await deleteImage({
                variables: {
                    id,
                },
                onCompleted: () => {
                    toast.success('Image deleted successfully')
                },
                onError: (err) => {
                    toast.error('Image delete failed')
                },
                update: (cache, { data }) => {
                    const deletedImageId = data?.softDeleteImage?.id
                    if (deletedImageId) {
                        cache.modify({
                            id: cache.identify({
                                __typename: 'User',
                                id: vendorAccount.id,
                            }), // Identify the vendor object
                            fields: {
                                featuredImages: (
                                    existingImagesRefs,
                                    { readField }
                                ) => {
                                    return existingImagesRefs.filter(
                                        (imageRef) =>
                                            deletedImageId !==
                                            readField('id', imageRef)
                                    )
                                },
                            },
                        })
                    }
                },
            })
        } catch (err) {
            alert(err.message)
        }
    }

    const deleteMarkerHandler = async (id: number) => {
        try {
            deleteMarker({
                variables: {
                    id,
                },
                onCompleted: () => {
                    toast.success('Marker deleted successfully')
                },
                onError: (err) => {
                    toast.error('Marker delete failed')
                },
                update: (cache, { data }) => {
                    const deletedMarkerId = data?.softDeleteMarker?.id
                    if (deletedMarkerId) {
                        cache.modify({
                            id: cache.identify({
                                __typename: 'User',
                                id: vendorAccount.id,
                            }), // Identify the vendor object
                            fields: {
                                Markers: (
                                    existingMarkersRefs,
                                    { readField }
                                ) => {
                                    return existingMarkersRefs.filter(
                                        (markerRef) =>
                                            deletedMarkerId !==
                                            readField('id', markerRef)
                                    )
                                },
                            },
                        })
                    }
                },
            })
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className="">
            <section className="space-y-8">
                <h2 className="text-2xl font-bold">Your Profile</h2>

                <div className="flex space-x-8 justify-between items-center mt-4">
                    <div>
                        <h2 className="text-sm">Username</h2>
                        <p className="text-lg font-semibold">
                            {vendorAccount?.username}
                        </p>
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => setIsUpdateUsernameModalOpen(true)}
                    >
                        Edit
                    </Button>
                    <UpdateUsernameModal
                        defaultValue={vendorAccount?.username}
                        isOpen={isUpdateUsernameModalOpen}
                        onClose={() => setIsUpdateUsernameModalOpen(false)}
                        onSubmit={onSubmitUsername}
                    />
                </div>
                <div className="flex space-x-8 justify-between items-center">
                    <div>
                        <h2 className="text-sm">Fullname</h2>
                        <p className="text-lg font-semibold">
                            {vendorAccount?.name}
                        </p>
                    </div>
                    {/* <Button
                        variant="secondary"
                        onClick={() => setIsUpdateNameModalOpen(true)}
                    >
                        Edit
                    </Button>
                    <UpdateNameModal
                        defaultValue={vendorAccount?.name}
                        isOpen={isUpdateNameModalOpen}
                        onClose={() => setIsUpdateNameModalOpen(false)}
                        onSubmit={onSubmitName}
                    /> */}
                </div>
                <div className="flex space-x-8 justify-between items-center">
                    <div>
                        <h2 className="text-sm">Mobile Number</h2>
                        <p className="text-lg font-semibold">
                            {vendorAccount?.mobileNumber}
                        </p>
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => setIsUpdateMobileNumberModalOpen(true)}
                    >
                        Edit
                    </Button>
                    <UpdateMobileNumberModal
                        defaultValue={vendorAccount?.mobileNumber}
                        isOpen={isUpdateMobileNumberModalOpen}
                        onClose={() => setIsUpdateMobileNumberModalOpen(false)}
                        onSubmit={onSubmitMobileNumber}
                    />
                </div>

                <div className="flex space-x-8 justify-between items-center">
                    <div>
                        <h2 className="text-sm">Email</h2>
                        <p className="text-lg font-semibold">
                            {vendorAccount?.email}
                        </p>
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => setIsUpdateEmailModalOpen(true)}
                    >
                        Edit
                    </Button>
                    <UpdateEmailModal
                        defaultValue={vendorAccount?.email}
                        isOpen={isUpdateEmailModalOpen}
                        onClose={() => setIsUpdateEmailModalOpen(false)}
                        onSubmit={onSubmitEmail}
                    />
                </div>
            </section>

            <section className="mt-16">
                <div className="flex flex-col justify-between space-y-2 mb-4">
                    <div>
                        <h2 className="font-semibold mb-2">
                            Your custom markers
                        </h2>
                    </div>
                </div>
                {vendorAccount?.Markers.length === 0 && (
                    <div>
                        <p className="mt-4 text-sm">
                            You have not uploaded any custom markers. Go to the
                            home page and click your marker icon and tapping on
                            the plus icon.
                        </p>
                        <Button variant="outline" className="text-sm mt-4">
                            <Link to={routes.vendorIndex()}>
                                Go to Homepage &gt;
                            </Link>
                        </Button>
                    </div>
                )}
                <div className="flex space-x-8 mt-8">
                    {vendorAccount?.Markers?.map((image) => (
                        <div key={image.id} className="relative">
                            <div className="absolute -top-8 -right-2">
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        setIsDeleteMarkerModalOpen(true)
                                    }
                                    disabled={deleteMarkerLoading}
                                >
                                    <XMarkIcon className="w-2 h-2" />
                                </Button>
                            </div>
                            <ConfirmationModal
                                isOpen={isDeleteMarkerModalOpen}
                                title="Delete Image"
                                description="Are you sure you want to delete this image?"
                                confirmationButtonTitle="Delete"
                                onConfirm={() => deleteMarkerHandler(image.id)}
                                onClose={() => {
                                    setIsDeleteMarkerModalOpen(false)
                                }}
                            />
                            <img
                                src={image.url}
                                alt="marker icon"
                                className="object-scale-down w-12 h-12"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-16">
                <div className="flex flex-col justify-between space-y-2 mb-4">
                    <div>
                        <h2 className="font-semibold mb-2">Featured Images</h2>
                        <p className="text-sm">
                            {'('}This shows up in the popover when user clicks
                            on your map marker{')'}
                        </p>
                        <p className="text-sm">
                            Note: You can only upload up to two photos
                        </p>
                    </div>
                    <Button
                        icon={<PlusIcon />}
                        variant="secondary"
                        onClick={() => setIsUploadFeatureImageModalOpen(true)}
                        disabled={vendorAccount?.featuredImages?.length == 2}
                    >
                        Add Featured Image
                    </Button>
                </div>
                <div className="flex flex-col space-x-8 sm:flex-row">
                    {vendorAccount?.featuredImages?.map((image) => (
                        <FeaturedImage
                            key={image.id}
                            image={image}
                            imageDeleteLoading={imageDeleteLoading}
                            deleteImageHandler={deleteImageHandler}
                        />
                    ))}
                    {vendorAccount?.featuredImages.length < 2 && (
                        <ImageForm
                            onSave={uploadImageHandler}
                            error={imageUploadError}
                            image={null}
                            loading={imageUploading}
                            isOpen={isUploadFeatureImageModalOpen}
                            onClose={() =>
                                setIsUploadFeatureImageModalOpen(false)
                            }
                        />
                    )}
                </div>
            </section>

            <hr />

            <section className="mt-16">
                <h2 className="mb-4 font-semibold">Account Password</h2>
                <Button
                    variant="secondary"
                    onClick={() => setIsChangePasswordModalOpen(true)}
                >
                    Change Password
                </Button>
                <ChangePasswordModal
                    isOpen={isChangePasswordModalOpen}
                    onClose={() => setIsChangePasswordModalOpen(false)}
                    onSubmit={updateUserPasswordHandler}
                />
            </section>

            <hr className="mt-16" />

            <section className="p-4 border border-dashed border-red-700 rounded-lg mt-16">
                <h2 className="mb-4 font-semibold text-red-700">Danger Zone</h2>
                <Button
                    variant="danger"
                    onClick={() => setIsDeleteAccountModalOpen(true)}
                >
                    Delete Account
                </Button>
                <DeleteAccountModal
                    isOpen={isDeleteAccountModalOpen}
                    onClose={() => setIsDeleteAccountModalOpen(false)}
                    onSubmit={onDeleteAccount}
                />
            </section>
        </div>
    )
}
