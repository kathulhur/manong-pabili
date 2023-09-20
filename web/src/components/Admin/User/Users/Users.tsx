import { Link, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/User/UsersCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'
import { DELETE_USER_MUTATION } from 'src/components/Admin/User/User'
import {
    DeleteUserMutationVariables,
    VerifyUserMutation,
    VerifyUserMutationVariables,
    FindUsers,
} from 'types/graphql'
import Button from 'src/components/Button/Button'
import { BellIcon } from '@heroicons/react/20/solid'
import Table, { TableProps } from './Table/Table'
import Pagination from 'src/components/Pagination/Pagination'

export const VERIFY_USER_MUTATION = gql`
    mutation VerifyUserMutation($id: Int!) {
        verifyUser(id: $id) {
            id
            verified
        }
    }
`

export interface UsersProps {
    users: TableProps['users']
    count: number
}

const UsersList = ({ users, count }: UsersProps) => {
    const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
        onCompleted: () => {
            toast.success('User deleted')
        },
        onError: (error) => {
            toast.error(error.message)
        },
        // This refetches the query on the list page. Read more about other ways to
        // update the cache over here:
        // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
        update: (cache, { data: { softDeleteUser } }) => {
            const deletedUserId = softDeleteUser?.id
            cache.modify({
                fields: {
                    userPage: (
                        existingUserPage: FindUsers['userPage'],
                        { readField }
                    ): FindUsers['userPage'] => {
                        return {
                            ...existingUserPage,
                            users: existingUserPage.users.filter(
                                (user) =>
                                    deletedUserId !== readField('id', user)
                            ),
                            count: existingUserPage.count - 1,
                        }
                    },
                },
            })
        },
    })

    const [verifyUser] = useMutation<
        VerifyUserMutation,
        VerifyUserMutationVariables
    >(VERIFY_USER_MUTATION)
    const onDeleteClick = (id: DeleteUserMutationVariables['id']) => {
        if (confirm('Are you sure you want to delete user ' + id + '?')) {
            deleteUser({ variables: { id } })
        }
    }

    const onVerifyUser = (id: VerifyUserMutationVariables['id']) => {
        if (confirm('Are you sure you want to verify user ' + id + '?')) {
            verifyUser({
                variables: {
                    id,
                },
                onError: (error) => {
                    toast.error(error.graphQLErrors[0].message)
                },
                onCompleted: () => {
                    toast.success('User successfully verified')
                },
                update: (cache, { data: { verifyUser } }) => {
                    const verifiedUserId = verifyUser?.id
                    cache.modify({
                        fields: {
                            userPage: (
                                existingUserPage: FindUsers['userPage'],
                                { readField }
                            ): FindUsers['userPage'] => {
                                return {
                                    ...existingUserPage,
                                    users: existingUserPage.users.map((user) =>
                                        verifiedUserId === readField('id', user)
                                            ? { ...user, verified: true }
                                            : user
                                    ),
                                }
                            },
                        },
                    })
                },
            })
        }
    }

    return (
        <div className="space-y-4">
            <Table
                users={users}
                onDelete={onDeleteClick}
                onVerify={onVerifyUser}
            />
            <Pagination
                count={count}
                paginate={(page) => {
                    routes.adminUsers({ page })
                }}
            />
        </div>
    )
}

export default UsersList
