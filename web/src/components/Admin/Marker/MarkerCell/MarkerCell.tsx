import type { MarkerCellQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import LoadingComponent from 'src/components/Loading/Loading'
import Marker from 'src/components/Admin/Marker/Marker'
import { Link, routes } from '@redwoodjs/router'
import Breadcrumb, {
    BreadcrumbProps,
} from 'src/components/Breadcrumb/Breadcrumb'
import { MarkerCellContextProvider } from './Context'

export const QUERY = gql`
    query MarkerCellQuery($id: Int!) {
        marker(id: $id) {
            id
            url
            userId
            createdAt
            updatedAt
            deleted
            deletedAt
            user {
                id
                username
            }
        }
    }
`

export const DELETE_MARKER_MUTATION = gql`
    mutation DeleteAdminMarkerMutation($id: Int!) {
        softDeleteMarker(id: $id) {
            id
        }
    }
`

export const Loading = () => null

export const Empty = () => <div>Marker not found</div>

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ marker }: CellSuccessProps<MarkerCellQuery>) => {
    const pages: BreadcrumbProps['pages'] = [
        {
            name: 'Users',
            to: routes.adminUsers(),
        },
        {
            name: marker.user.username,
            to: routes.adminUser({ id: marker.id }),
        },
        {
            name: 'Markers',
            to: routes.adminMarkers(),
        },
        {
            name: String(marker.id),
            to: routes.adminMarker({ id: marker.id }),
            current: true,
        },
    ]
    return (
        <MarkerCellContextProvider marker={marker}>
            <div className="space-y-4">
                <Breadcrumb pages={pages} />
                <Marker />
            </div>
        </MarkerCellContextProvider>
    )
}
