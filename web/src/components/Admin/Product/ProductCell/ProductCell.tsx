import type { ProductCellQuery } from 'types/graphql'

import { type CellSuccessProps, type CellFailureProps } from '@redwoodjs/web'

import Product from 'src/components/Admin/Product/Product'
import { routes } from '@redwoodjs/router'
import Breadcrumb, {
    BreadcrumbProps,
} from 'src/components/Breadcrumb/Breadcrumb'
import { ProductCellContextProvider } from './Context'
export const QUERY = gql`
    query ProductCellQuery($id: Int!) {
        product(id: $id) {
            id
            name
            availability
            userId
            user {
                id
                username
            }
            createdAt
            updatedAt
            deletedAt
            deleted
        }
    }
`

export const DELETE_PRODUCT_MUTATION = gql`
    mutation DeleteProductMutation($id: Int!) {
        softDeleteProduct(id: $id) {
            id
        }
    }
`

export const UPDATE_PRODUCT_NAME_MUTATION = gql`
    mutation UpdateProductNameMutation($id: Int!, $name: String!) {
        updateProduct(id: $id, input: { name: $name }) {
            id
            name
        }
    }
`

export const UPDATE_PRODUCT_AVAILABILITY_MUTATION = gql`
    mutation UpdateAdminProductAvailabilityMutation(
        $id: Int!
        $availability: Boolean!
    ) {
        updateProduct(id: $id, input: { availability: $availability }) {
            id
            availability
        }
    }
`

export const Loading = () => null

export const Empty = () => <div>Product not found</div>

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ product }: CellSuccessProps<ProductCellQuery>) => {
    const pages: BreadcrumbProps['pages'] = [
        {
            name: 'Users',
            to: routes.adminUsers(),
        },
        {
            name: product.user.username,
            to: routes.adminUser({ id: product.userId }),
        },
        {
            name: 'Products',
            to: routes.adminProducts(),
        },
        {
            name: product.name,
            to: routes.adminProduct({ id: product.id }),
            current: true,
        },
    ]
    return (
        <ProductCellContextProvider product={product}>
            <div className="space-y-8">
                <Breadcrumb pages={pages} />
                <Product />
            </div>
        </ProductCellContextProvider>
    )
}
