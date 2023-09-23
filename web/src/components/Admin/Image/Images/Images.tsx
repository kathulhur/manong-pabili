import { routes } from '@redwoodjs/router'
import Pagination from 'src/components/Pagination/Pagination'
import Table, { TableProps } from './Table/Table'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import { useContext } from 'react'

export interface ImagesListProps {
    images: TableProps['images']
    count: number
    user: TableProps['user']
}

const ImagesList = ({ images, count, user }: ImagesListProps) => {
    const { pageSize } = useContext(PaginationContext)
    return (
        <div className="space-y-4">
            <Table images={images} user={user} />
            <Pagination
                count={count}
                paginate={(page) => routes.adminImages({ page, pageSize })}
            />
        </div>
    )
}

export default ImagesList
