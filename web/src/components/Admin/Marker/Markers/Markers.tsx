import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import type {
    DeleteMarkerMutationVariables,
    MarkersCellQuery,
} from 'types/graphql'
import { DELETE_MARKER_MUTATION } from '../Marker/Marker'
import Table, { TableProps } from './Table/Table'
import Pagination from 'src/components/Pagination/Pagination'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import { useContext } from 'react'

export interface MarkersListProps {
    markers: TableProps['markers']
    count: number
    user: TableProps['user']
}

const MarkersList = ({ markers, count, user }: MarkersListProps) => {
    const [deleteMarker] = useMutation(DELETE_MARKER_MUTATION, {
        onCompleted: () => {
            toast.success('Marker deleted')
        },
        onError: (error) => {
            toast.error(error.message)
        },
        update: (cache, { data: { softDeleteMarker } }) => {
            const deletedMarkerId = softDeleteMarker?.id
            cache.modify({
                fields: {
                    markerPage: (
                        existingMarkerPage: MarkersCellQuery['markerPage'],
                        { readField }
                    ): MarkersCellQuery['markerPage'] => {
                        return {
                            ...existingMarkerPage,
                            markers: existingMarkerPage.markers.filter(
                                (marker) =>
                                    deletedMarkerId !== readField('id', marker)
                            ),
                            count: existingMarkerPage.count - 1,
                        }
                    },
                },
            })
        },
    })

    const onDelete = (id: DeleteMarkerMutationVariables['id']) => {
        if (confirm('Are you sure you want to delete marker ' + id + '?')) {
            deleteMarker({ variables: { id } })
        }
    }

    const { pageSize } = useContext(PaginationContext)

    return (
        <div className="space-y-4">
            <Table markers={markers} user={user} />
            <Pagination
                count={count}
                paginate={(page) => routes.adminMarkers({ page, pageSize })}
            />
        </div>
    )
}

export default MarkersList
