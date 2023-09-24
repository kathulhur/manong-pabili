import { type ProductsQuery } from 'types/graphql'

import { type CellSuccessProps, type CellFailureProps } from '@redwoodjs/web'
import Products from '../Products/Products'
import Skeleton from 'src/components/Skeleton/Skeleton'
export const QUERY = gql`
    query ProductsQuery($userId: Int!) {
        productsByUser(userId: $userId) {
            id
            name
            availability
            createdAt
        }
    }
`

export const Loading = () => (
    <Skeleton>
        <Skeleton.Rectangle lines={4} gap={16} height={80} />
    </Skeleton>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
    productsByUser,
}: CellSuccessProps<ProductsQuery>) => {
    return <Products products={productsByUser} />
}
