import type { MarkersCellQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import LoadingComponent from 'src/components/Loading/Loading'
import Markers from 'src/components/Admin/Marker/Markers'
import Pagination, {
    PaginationProps,
} from 'src/components/Pagination/Pagination'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import { useContext } from 'react'
import { MarkersPageContext } from 'src/pages/Admin/Marker/MarkersPage/Context'
import Breadcrumb, {
    BreadcrumbProps,
} from 'src/components/Breadcrumb/Breadcrumb'

export const beforeQuery = () => {
    const { page, pageSize } = useContext(PaginationContext)
    const markersPageContext = useContext(MarkersPageContext)

    return {
        variables: {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            filter: { userId: markersPageContext?.userId },
            userId: markersPageContext?.userId || -1,
        },
    }
}

export const QUERY = gql`
    query MarkersCellQuery(
        $limit: Int!
        $offset: Int!
        $filter: MarkerPageFilterInput
        $userId: Int!
    ) {
        markerPage(limit: $limit, offset: $offset, filter: $filter) {
            markers {
                id
                url
                userId
                createdAt
                updatedAt
                deletedAt
                deleted
                user {
                    id
                    username
                }
            }
            count
        }
        user(id: $userId) {
            id
            username
        }
    }
`

export const Loading = () => null

export const Empty = () => {
    return (
        <div className="rw-text-center">
            {'No markers yet. '}
            <Link to={routes.adminNewMarker()} className="rw-link">
                {'Create one?'}
            </Link>
        </div>
    )
}

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
    markerPage: { markers, count },
    user,
}: CellSuccessProps<MarkersCellQuery>) => {
    let pages: BreadcrumbProps['pages'] = []
    if (user) {
        pages = [
            {
                name: 'Users',
                to: routes.admin({
                    tab: 'users',
                }),
            },
            {
                name: user.username,
                to: routes.adminUser({ id: user.id, tab: 'users' }),
            },
            {
                name: 'Markers',
                to: routes.adminMarkers({
                    tab: 'markers',
                }),
            },
        ]
    } else {
        pages = [
            {
                name: 'Markers',
                to: routes.adminMarkers({
                    tab: 'markers',
                }),
            },
        ]
    }
    return (
        <div>
            <Breadcrumb pages={pages} />
            <Markers markers={markers} count={count} user={user} />
        </div>
    )
}
