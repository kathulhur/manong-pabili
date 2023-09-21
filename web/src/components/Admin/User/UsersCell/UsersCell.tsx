import type { FindUsers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Users from 'src/components/Admin/User/Users'
import { useContext, useEffect } from 'react'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import Breadcrumb from 'src/components/Breadcrumb/Breadcrumb'
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
    return (
        <div>
            <Breadcrumb
                pages={[
                    {
                        name: 'Users',
                        to: routes.adminUsers({
                            page: 1,
                            pageSize: 10,
                        }),
                        current: false,
                    },
                ]}
            />
            <Users users={users} count={count} />
        </div>
    )
}
