import type { UserCellQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import User from 'src/components/Admin/User/User'
import { UserCellContextProvider } from './Context'
import Breadcrumb, {
    BreadcrumbProps,
} from 'src/components/Breadcrumb/Breadcrumb'
import { routes } from '@redwoodjs/router'
export const QUERY = gql`
    query UserCellQuery($id: Int!) {
        user: detailedUser(id: $id) {
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
            locationBroadcastMode
            locationHidden
            verified
            markerUrl
            createdAt
            updatedAt
            deletedAt
            deleted
            featuredImages {
                id
                url
                title
            }
            Markers {
                id
                url
            }
        }
    }
`

export const VERIFY_USER_MUTATION = gql`
    mutation VerifyUserMutation($id: Int!) {
        verifyUser(id: $id) {
            id
            verified
        }
    }
`

export const ADMIN_DELETE_USER_MUTATION = gql`
    mutation AdminDeleteUserMutation($id: Int!) {
        softDeleteUser(id: $id) {
            id
        }
    }
`

export const Loading = () => null

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<UserCellQuery>) => {
    const pages: BreadcrumbProps['pages'] = [
        {
            name: 'Users',
            to: routes.adminUsers({
                tab: 'users',
            }),
        },
        {
            name: user.name,
            to: routes.adminUser({ id: user.id, tab: 'users' }),
            current: true,
        },
    ]
    return (
        <UserCellContextProvider user={user}>
            <div className="space-y-8">
                <Breadcrumb pages={pages} />
                <User />
            </div>
        </UserCellContextProvider>
    )
}
