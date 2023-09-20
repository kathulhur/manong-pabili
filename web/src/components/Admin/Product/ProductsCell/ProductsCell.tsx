import type { FindProducts } from 'types/graphql'
import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Products from 'src/components/Admin/Product/Products'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import { useContext } from 'react'
import { ProductsPageContext } from 'src/pages/Admin/Product/ProductsPage/Context'
export const beforeQuery = () => {
    const { page, pageSize } = useContext(PaginationContext)
    const productsPageContext = useContext(ProductsPageContext)
    return {
        variables: {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            filter: { userId: productsPageContext?.userId },
        },
    }
}

export const isEmpty = ({
    productPage: { count },
}: CellSuccessProps<FindProducts>) => {
    return count === 0
}

export const QUERY = gql`
    query FindProducts(
        $limit: Int!
        $offset: Int!
        $filter: ProductPageFilterInput
    ) {
        productPage(limit: $limit, offset: $offset, filter: $filter) {
            products {
                id
                name
                availability
                userId
            }
            count
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
}: CellSuccessProps<FindProducts>) => {
    const { userId } = useContext(ProductsPageContext)
    return (
        <div className="m-8">
            <div className="flex justify-between items-end">
                <div className="font-semibold space-x-2">
                    {!userId && (
                        <Link
                            to={routes.adminProducts()}
                            className="hover:underline hover:underline-offset-1"
                        >
                            Products
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
                                to={routes.adminProducts({ userId })}
                                className="hover:underline hover:underline-offset-1"
                            >
                                Products
                            </Link>
                        </>
                    )}
                </div>
                {userId && (
                    <Link
                        to={routes.adminNewProduct({ userId })}
                        className="flex items-center font-semibold border px-4 py-2 rounded-md"
                    >
                        <div className="rw-button-icon">+</div> Add Product
                    </Link>
                )}
                {!userId && (
                    <Link
                        to={routes.adminNewProduct()}
                        className="flex items-center font-semibold border px-4 py-2 rounded-md"
                    >
                        <div className="rw-button-icon">+</div> Add Product
                    </Link>
                )}
            </div>
            <div className="mt-8">
                <Products products={products} count={count} />
            </div>
        </div>
    )
}
