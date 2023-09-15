import type { FindProductById } from 'types/graphql'

import {
    type CellSuccessProps,
    type CellFailureProps,
    MetaTags,
} from '@redwoodjs/web'

import Product from 'src/components/Admin/Product/Product'
import { Link, routes } from '@redwoodjs/router'
import LoadingComponent from 'src/components/Loading/Loading'
export const QUERY = gql`
    query FindProductById($id: Int!) {
        product: product(id: $id) {
            id
            name
            availability
            userId
            createdAt
            updatedAt
            deletedAt
            deleted
        }
    }
`

export const Loading = () => null

export const Empty = () => <div>Product not found</div>

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ product }: CellSuccessProps<FindProductById>) => {
    return (
        <div className="m-8">
            <MetaTags title="User Product" description="UserProducts page" />
            <div className="p-2">
                <div className="font-semibold space-x-2">
                    <Link
                        to={routes.adminUsers()}
                        className="hover:underline hover:underline-offset-1"
                    >
                        Users
                    </Link>
                    <span>&gt;</span>
                    <Link
                        to={routes.adminUser({ id: product.userId })}
                        className="hover:underline hover:underline-offset-1"
                    >
                        {product.userId}
                    </Link>
                    <span>&gt;</span>
                    <Link
                        to={routes.adminUserProducts({ id: product.userId })}
                        className="hover:underline hover:underline-offset-1"
                    >
                        Products
                    </Link>
                    <span>&gt;</span>
                    <Link
                        to={routes.adminUserProducts({ id: product.userId })}
                        className="hover:underline hover:underline-offset-1"
                    >
                        {product.name}
                    </Link>
                </div>
            </div>
            <div className="mt-8">
                <Product product={product} />
            </div>
        </div>
    )
}
