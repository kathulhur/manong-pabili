import type { ImagesCellQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Images from 'src/components/Admin/Image/Images'
import Pagination, {
    PaginationProps,
} from 'src/components/Pagination/Pagination'
import { useContext } from 'react'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import { ImagesPageContext } from 'src/pages/Admin/Image/ImagesPage/Context'
import Breadcrumb, {
    BreadcrumbProps,
} from 'src/components/Breadcrumb/Breadcrumb'
export const beforeQuery = () => {
    const { page, pageSize } = useContext(PaginationContext)
    const imagesPageContext = useContext(ImagesPageContext)

    return {
        variables: {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            filter: { userId: imagesPageContext?.userId },
            userId: imagesPageContext?.userId || -1,
        },
    }
}

export const QUERY = gql`
    query ImagesCellQuery(
        $limit: Int!
        $offset: Int!
        $filter: ImagePageFilterInput
        $userId: Int!
    ) {
        imagePage(limit: $limit, offset: $offset, filter: $filter) {
            images {
                id
                title
                url
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

export const isEmpty = ({
    imagePage: { count },
    user,
}: CellSuccessProps<ImagesCellQuery>) => {
    return count === 0
}

export const Loading = () => null

export const Empty = () => {
    return (
        <div className="rw-text-center">
            {'No images yet. '}
            {/* <Link to={routes.adminNewImage()} className="rw-link">
        {"Create one?"}
      </Link> */}
        </div>
    )
}

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
    imagePage: { images, count },
    user,
}: CellSuccessProps<ImagesCellQuery>) => {
    let pages: BreadcrumbProps['pages'] = []
    if (user) {
        pages = [
            { name: 'Users', to: routes.adminImages() },
            { name: user.username, to: routes.adminUser({ id: user.id }) },
            { name: 'Images', to: routes.adminImages() },
        ]
    } else {
        pages = [{ name: 'Images', to: routes.adminImages() }]
    }
    return (
        <div>
            <Breadcrumb pages={pages} />
            <Images images={images} count={count} user={user} />
        </div>
    )
}
