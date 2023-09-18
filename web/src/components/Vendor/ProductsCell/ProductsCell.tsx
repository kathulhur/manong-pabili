import { type ProductsQuery } from 'types/graphql'

import { type CellSuccessProps, type CellFailureProps } from '@redwoodjs/web'
import Products from '../Products/Products'
export const QUERY = gql`
    query ProductsQuery($userId: Int!) {
        productsByUser(userId: $userId) {
            id
            name
            availability
        }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
    productsByUser,
}: CellSuccessProps<ProductsQuery>) => {
    return <Products products={productsByUser} />
}
