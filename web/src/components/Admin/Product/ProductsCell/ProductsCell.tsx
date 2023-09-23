import type { ProductsCellQuery } from 'types/graphql'
import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Products from 'src/components/Admin/Product/Products'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import { useContext } from 'react'
import { ProductsPageContext } from 'src/pages/Admin/Product/ProductsPage/Context'
import Breadcrumb, {
    BreadcrumbProps,
} from 'src/components/Breadcrumb/Breadcrumb'
export const beforeQuery = () => {
    const { page, pageSize } = useContext(PaginationContext)
    const productsPageContext = useContext(ProductsPageContext)
    const userId = productsPageContext?.userId || -1
    return {
        variables: {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            filter: { userId: productsPageContext?.userId },
            userId,
        },
    }
}

export const isEmpty = ({
    productPage: { count },
}: CellSuccessProps<ProductsCellQuery>) => {
    return count === 0
}

export const QUERY = gql`
    query ProductsCellQuery(
        $limit: Int!
        $offset: Int!
        $filter: ProductPageFilterInput
        $userId: Int!
    ) {
        productPage(limit: $limit, offset: $offset, filter: $filter) {
            products {
                id
                name
                availability
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
            {'No products yet. '}
            {/* <Link to={routes.adminNewProduct()} className="rw-link">
        {"Create one?"}
      </Link> */}
        </div>
    )
}

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
    productPage: { products, count },
    user,
}: CellSuccessProps<ProductsCellQuery>) => {
    const { userId } = useContext(ProductsPageContext)
    let pages: BreadcrumbProps['pages'] = []
    if (user) {
        pages = [
            {
                name: 'Users',
                to: routes.adminUsers({
                    page: 1,
                    pageSize: 10,
                    tab: 'users',
                }),
                current: false,
            },
            {
                name: user.username,
                to: routes.adminUser({
                    id: userId,
                    tab: 'users',
                }),
                current: false,
            },
            {
                name: 'Products',
                to: routes.adminProducts({
                    page: 1,
                    pageSize: 10,
                    userId,
                    tab: 'products',
                }),
                current: true,
            },
        ]
    } else {
        pages = [
            {
                name: 'Products',
                to: routes.adminProducts({
                    page: 1,
                    pageSize: 10,
                    userId,
                    current: true,
                    tab: 'products',
                }),
                current: true,
            },
        ]
    }
    return (
        <div>
            <Breadcrumb pages={pages} />
            <Products products={products} count={count} user={user} />
        </div>
    )
}
