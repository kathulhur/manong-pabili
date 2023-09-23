import { createContext, useState } from 'react'
import {
    AdminDeleteUserMutation,
    AdminDeleteUserMutationVariables,
    UpdateEmailMutation,
    UpdateEmailMutationVariables,
    UpdateMobileNumberMutation,
    UpdateMobileNumberMutationVariables,
    UpdateNameMutation,
    UpdateNameMutationVariables,
    UpdateUsernameMutation,
    UpdateUsernameMutationVariables,
    UserCellQuery,
    VerifyUserMutation,
    VerifyUserMutationVariables,
} from 'types/graphql'
import {
    ADMIN_DELETE_USER_MUTATION,
    VERIFY_USER_MUTATION,
} from 'src/components/Admin/User/UserCell/UserCell'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'
import {
    UPDATE_EMAIL_MUTATION,
    UPDATE_MOBILE_NUMBER_MUTATION,
    UPDATE_NAME_MUTATION,
    UPDATE_USERNAME_MUTATION,
} from 'src/components/Vendor/VendorAccountCell'

export interface UserCellContextValue {
    user: UserCellQuery['user']
    onVerifyUser: () => void
    isDeleteUserModalOpen: boolean
    onDeleteUser: () => void
    toggleDeleteUserModal: () => void

    onUpdateName: (name: string) => void
    isUpdateNameModalOpen: boolean
    toggleUpdateNameModal: () => void

    onUpdateEmail: (email: string) => void
    isUpdateEmailModalOpen: boolean
    toggleUpdateEmailModal: () => void

    onUpdateUsername: (username: string) => void
    isUpdateUsernameModalOpen: boolean
    toggleUpdateUsernameModal: () => void

    onUpdateMobileNumber: (mobileNumber: string) => void
    isUpdateMobileNumberModalOpen: boolean
    toggleUpdateMobileNumberModal: () => void
}

export const DELETE_USER_MUTATION = gql`
    mutation DeleteUserMutation($id: Int!) {
        softDeleteUser(id: $id) {
            id
        }
    }
`

export const UserCellContext = createContext<UserCellContextValue>(null)

export interface UserCellContextProviderProps {
    user: UserCellQuery['user']
    children: React.ReactNode
}

export const UserCellContextProvider = ({
    user,
    children,
}: UserCellContextProviderProps) => {
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false)
    const [isUpdateNameModalOpen, setIsUpdateNameModalOpen] = useState(false)
    const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] = useState(false)
    const [isUpdateUsernameModalOpen, setIsUpdateUsernameModalOpen] =
        useState(false)
    const [isUpdateMobileNumberModalOpen, setIsUpdateMobileNumberModalOpen] =
        useState(false)

    const [verifyUser] = useMutation<
        VerifyUserMutation,
        VerifyUserMutationVariables
    >(VERIFY_USER_MUTATION)

    const onVerifyUser = () => {
        if (confirm('Are you sure you want to verify user ' + user.id + '?')) {
            verifyUser({
                variables: {
                    id: user.id,
                },
                onError: (error) => {
                    error?.graphQLErrors.map(({ message }) => {
                        toast.error(message)
                    })
                },
                onCompleted: () => {
                    toast.success('User successfully verified')
                },
            })
        }
    }

    const [deleteUser] = useMutation<
        AdminDeleteUserMutation,
        AdminDeleteUserMutationVariables
    >(ADMIN_DELETE_USER_MUTATION)

    const onDeleteUser = () => {
        if (confirm('Are you sure you want to delete user ' + user.id + '?')) {
            deleteUser({
                variables: {
                    id: user.id,
                },
                onError: (error) => {
                    error?.graphQLErrors.map(({ message }) => {
                        toast.error(message)
                    })
                },
                onCompleted: () => {
                    toast.success('User successfully deleted')
                    navigate(routes.adminUsers())
                },
            })
        }
    }

    const [updateName] = useMutation<
        UpdateNameMutation,
        UpdateNameMutationVariables
    >(UPDATE_NAME_MUTATION)

    const onUpdateName: UserCellContextValue['onUpdateName'] = (name) => {
        if (
            confirm(
                'Are you sure you want to update the name of user ' +
                    user.id +
                    '?'
            )
        ) {
            updateName({
                variables: {
                    id: user.id,
                    name: name,
                },
                onError: (error) => {
                    error?.graphQLErrors.map(({ message }) => {
                        toast.error(message)
                    })
                },
                onCompleted: () => {
                    toast.success('User name successfully updated')
                    setIsUpdateNameModalOpen(false)
                },
            })
        }
    }

    const [updateEmail] = useMutation<
        UpdateEmailMutation,
        UpdateEmailMutationVariables
    >(UPDATE_EMAIL_MUTATION)

    const onUpdateEmail: UserCellContextValue['onUpdateEmail'] = (email) => {
        if (
            confirm(
                'Are you sure you want to update the email of user ' +
                    user.id +
                    '?'
            )
        ) {
            updateEmail({
                variables: {
                    id: user.id,
                    email: email,
                },
                onError: (error) => {
                    error?.graphQLErrors.map(({ message }) => {
                        toast.error(message)
                    })
                },
                onCompleted: () => {
                    toast.success('User email successfully updated')
                    setIsUpdateEmailModalOpen(false)
                },
            })
        }
    }

    const [updateUsername] = useMutation<
        UpdateUsernameMutation,
        UpdateUsernameMutationVariables
    >(UPDATE_USERNAME_MUTATION)

    const onUpdateUsername: UserCellContextValue['onUpdateUsername'] = (
        username
    ) => {
        if (
            confirm(
                'Are you sure you want to update the username of user ' +
                    user.id +
                    '?'
            )
        ) {
            updateUsername({
                variables: {
                    id: user.id,
                    username: username,
                },
                onError: (error) => {
                    error?.graphQLErrors.map(({ message }) => {
                        toast.error(message)
                    })
                },
                onCompleted: () => {
                    toast.success('User username successfully updated')
                    setIsUpdateUsernameModalOpen(false)
                },
            })
        }
    }

    const [updateMobileNumber] = useMutation<
        UpdateMobileNumberMutation,
        UpdateMobileNumberMutationVariables
    >(UPDATE_MOBILE_NUMBER_MUTATION)

    const onUpdateMobileNumber: UserCellContextValue['onUpdateMobileNumber'] = (
        mobileNumber
    ) => {
        if (
            confirm(
                'Are you sure you want to update the mobile number of user ' +
                    user.id +
                    '?'
            )
        ) {
            updateMobileNumber({
                variables: {
                    id: user.id,
                    mobileNumber: mobileNumber,
                },
                onError: (error) => {
                    error?.graphQLErrors.map(({ message }) => {
                        toast.error(message)
                    })
                },
                onCompleted: () => {
                    toast.success('User mobile number successfully updated')
                    setIsUpdateMobileNumberModalOpen(false)
                },
            })
        }
    }

    const toggleDeleteUserModal = () => {
        setIsDeleteUserModalOpen(!isDeleteUserModalOpen)
    }

    const toggleUpdateNameModal = () => {
        setIsUpdateNameModalOpen(!isUpdateNameModalOpen)
    }

    const toggleUpdateEmailModal = () => {
        setIsUpdateEmailModalOpen(!isUpdateEmailModalOpen)
    }

    const toggleUpdateUsernameModal = () => {
        setIsUpdateUsernameModalOpen(!isUpdateUsernameModalOpen)
    }

    const toggleUpdateMobileNumberModal = () => {
        setIsUpdateMobileNumberModalOpen(!isUpdateMobileNumberModalOpen)
    }

    return (
        <UserCellContext.Provider
            value={{
                user,
                onVerifyUser,
                onDeleteUser,
                isDeleteUserModalOpen,
                toggleDeleteUserModal,

                onUpdateName,
                isUpdateNameModalOpen,
                toggleUpdateNameModal,

                onUpdateEmail,
                isUpdateEmailModalOpen,
                toggleUpdateEmailModal,

                onUpdateUsername,
                isUpdateUsernameModalOpen,
                toggleUpdateUsernameModal,

                onUpdateMobileNumber,
                isUpdateMobileNumberModalOpen,
                toggleUpdateMobileNumberModal,
            }}
        >
            {children}
        </UserCellContext.Provider>
    )
}
