import { routes } from '@redwoodjs/router'
import Table, { TableProps } from './Table/Table'
import Pagination from 'src/components/Pagination/Pagination'
import { useContext } from 'react'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'

export interface UsersProps {
    users: TableProps['users']
    count: number
}

const UsersList = ({ users, count }: UsersProps) => {
    const { pageSize } = useContext(PaginationContext)
    return (
        <div className="space-y-4">
            <Table users={users} />
            <Pagination
                count={count}
                paginate={(page) => routes.adminUsers({ page, pageSize })}
            />
        </div>
    )
}

export default UsersList
