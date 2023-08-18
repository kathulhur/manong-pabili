import { useState } from 'react'

import type { DashboardProductsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import {
    type CellSuccessProps,
    type CellFailureProps,
    useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
export const QUERY = gql`
    query DashboardProductsQuery($userId: Int!) {
        dashboardProducts: productsByUser(userId: $userId) {
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

export const Success = ({
    dashboardProducts,
}: CellSuccessProps<DashboardProductsQuery>) => {
    return (
        <>
            <ul>
                {dashboardProducts.map((product) => (
                    <li key={product.id}>
                        <DashboardProduct product={product} />
                    </li>
                ))}
            </ul>
            <Link to={routes.products()}>visit products page</Link>
        </>
    )
}

const DashboardProduct = ({
    product,
}: {
    product: DashboardProductsQuery['dashboardProducts'][number]
}) => {
    const [isProductAvailable, setIsProductAvailable] = useState(
        product.availability
    )

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error updating product availability')
            console.log(error)
        },
        onCompleted: () => {
            toast.success('Product availability updated')
            console.log('Product updated')
        },
        refetchQueries: [{ query: QUERY }],
    })

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
            setIsProductAvailable(!isProductAvailable)
        } catch (error) {
            alert('Error updating product availability')
            console.log(error)
        }
    }
    return (
        <div>
            <div>
                <span>{product.name}</span>
                <button
                    type="button"
                    onClick={productAvailabilityButtonHandler}
                >
                    {isProductAvailable ? 'Available' : 'Unavailable'}
                </button>
            </div>
        </div>
    )
}
