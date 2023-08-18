import type { ProductsQuery } from 'types/graphql'

import {
    type CellSuccessProps,
    type CellFailureProps,
    useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

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
    return (
        <ul>
            {productsByUser.map((product) => (
                <SingleProduct key={product.id} product={product} />
            ))}
        </ul>
    )
}

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UpdateProductAvailabilityMutation(
        $id: Int!
        $input: UpdateProductInput!
    ) {
        updateProduct(id: $id, input: $input) {
            id
        }
    }
`

const DELETE_PRODUCT_MUTATION = gql`
    mutation DeleteProductMutation($id: Int!) {
        deleteProduct(id: $id) {
            id
        }
    }
`

const SingleProduct = ({
    product,
}: {
    product: ProductsQuery['productsByUser'][number]
}) => {
    const { currentUser } = useAuth()

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error updating product availability')
            console.log(error)
        },
        onCompleted: () => {
            toast.success('Product availability updated')
            console.log('Product updated')
        },
        refetchQueries: [
            { query: QUERY, variables: { userId: currentUser.id } },
        ],
    })

    const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error deleting product')
            console.log(error)
        },
        onCompleted: () => {
            toast.success('Product deleted')
            console.log('Product deleted')
        },
        refetchQueries: [
            { query: QUERY, variables: { userId: currentUser.id } },
        ],
    })

    const deleteProductHandler = () => {
        try {
            deleteProduct({
                variables: {
                    id: product.id,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateProductAvailability = (id: number, availability: boolean) => {
        updateProduct({
            variables: {
                id,
                input: {
                    availability: !availability,
                },
            },
        })
    }

    const productAvailabilityButtonHandler = () => {
        try {
            updateProductAvailability(product.id, product.availability)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <li key={product.id}>
            <div>
                <span>{product.name}</span>
                <button
                    type="button"
                    onClick={productAvailabilityButtonHandler}
                >
                    {product.availability ? 'Available' : 'Unavailable'}
                </button>

                <button type="button" onClick={deleteProductHandler}>
                    {' '}
                    X{' '}
                </button>
            </div>
        </li>
    )
}
