import type { FindUsers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Users from 'src/components/Admin/User/Users'
import { useContext, useEffect } from 'react'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
export const beforeQuery = () => {
    const { page, pageSize } = useContext(PaginationContext)
    return { variables: { limit: pageSize, offset: (page - 1) * pageSize } }
}

export const QUERY = gql`
    query FindUsers($limit: Int!, $offset: Int!) {
        userPage(limit: $limit, offset: $offset) {
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
                locationBroadcastMode
                verified
                markerUrl
                createdAt
                updatedAt
                deletedAt
                deleted
            }
            count
        }
    }
`

export const Loading = () => null

export const Empty = () => {
    return (
        <div className="rw-text-center">
            {'No users yet. '}
            {/* <Link to={routes.adminNewUser()} className="rw-link">
        {"Create one?"}
      </Link> */}
        </div>
    )
}

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
    userPage: { users, count },
}: CellSuccessProps<FindUsers>) => {
    console.log(users)
    return (
        <div className="m-8">
            <div className="flex justify-between items-end">
                <div className="font-semibold">
                    <Link
                        to={routes.adminUsers()}
                        className="hover:underline hover:underline-offset-1 "
                    >
                        Users
                    </Link>
                </div>
                <Link
                    to={routes.adminNewUser()}
                    className="flex items-center font-semibold border px-4 py-2 rounded-md"
                >
                    <div className="rw-button-icon">+</div> New User
                </Link>
            </div>
            <div className="mt-8">
                <Users users={users} count={count} />
            </div>
        </div>
    )
}
