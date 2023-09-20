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

export const beforeQuery = () => {
    const { page, pageSize } = useContext(PaginationContext)
    const markersPageContext = useContext(MarkersPageContext)

    return {
        variables: {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            filter: { userId: markersPageContext?.userId },
        },
    }
}

export const QUERY = gql`
    query MarkersCellQuery(
        $limit: Int!
        $offset: Int!
        $filter: MarkerPageFilterInput
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
            }
            count
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
}: CellSuccessProps<MarkersCellQuery>) => {
    const markersPageContext = useContext(MarkersPageContext)
    const userId = markersPageContext?.userId
    return (
        <div className="m-8">
            <div className="m-2 flex justify-between">
                <div className="font-semibold space-x-2 flex items-end">
                    {!userId && (
                        <Link
                            to={routes.adminMarkers()}
                            className="hover:underline hover:underline-offset-1"
                        >
                            Markers
                        </Link>
                    )}
                    {userId && (
                        <>
                            <Link
                                to={routes.adminUsers()}
                                className="hover:underline hover:underline-offset-1"
                            >
                                Users
                            </Link>
                            <span>&gt;</span>
                            <Link
                                to={routes.adminUser({ id: userId })}
                                className="hover:underline hover:underline-offset-1"
                            >
                                {userId}
                            </Link>
                            <span>&gt;</span>
                            <Link
                                to={routes.adminMarkers()}
                                className="hover:underline hover:underline-offset-1"
                            >
                                Markers
                            </Link>
                        </>
                    )}
                </div>
                {userId && (
                    <Link
                        to={routes.adminNewMarker({ userId })}
                        className="flex items-center font-semibold border px-4 py-2 rounded-md"
                    >
                        <div className="rw-button-icon">+</div> Add Marker
                    </Link>
                )}
                {!userId && (
                    <Link
                        to={routes.adminNewMarker()}
                        className="flex items-center font-semibold border px-4 py-2 rounded-md"
                    >
                        <div className="rw-button-icon">+</div> Add Marker
                    </Link>
                )}
            </div>
            <div className="mt-8">
                <Markers markers={markers} count={count} />
            </div>
        </div>
    )
}
