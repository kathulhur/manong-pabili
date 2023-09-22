import { routes } from '@redwoodjs/router'
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
