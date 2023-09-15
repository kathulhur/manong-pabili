import type { FindProducts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Products from 'src/components/Admin/Product/Products'
import Pagination, {
    PaginationProps,
} from 'src/components/Pagination/Pagination'
import LoadingComponent from 'src/components/Loading/Loading'
export const beforeQuery = ({ page, userId }) => {
    page = page ? parseInt(page, 10) : 1
    userId = userId ? parseInt(userId, 10) : null

    return { variables: { page, filter: { userId } } }
}

export const isEmpty = ({
    productPage: { count },
}: CellSuccessProps<FindProducts>) => {
    return count === 0
}

export const QUERY = gql`
    query FindProducts($page: Int, $filter: ProductPageFilterInput) {
        productPage(page: $page, filter: $filter) {
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

interface SuccessProps extends CellSuccessProps<FindProducts> {
    paginate: PaginationProps['paginate']
    userId: number
}

export const Success = ({
    productPage: { products, count },
    paginate,
    userId,
}: SuccessProps) => {
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
                                to={routes.adminUserProducts({ id: userId })}
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
                <div className="mb-2">
                    <Pagination count={count} paginate={paginate} />
                </div>
                <Products products={products} />
            </div>
        </div>
    )
}
