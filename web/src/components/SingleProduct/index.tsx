import { useState } from 'react'

import { Product } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

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
    onDelete,
}: {
    product: Omit<Product, 'user' | 'userId'>
    onDelete: (productId: number) => void
}) => {
    const [isProductAvailable, setIsProductAvailable] = useState(
        product.availability
    )
    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onError: (error) => {
            alert('Error updating product availability')
            console.log(error)
        },
        onCompleted: () => {
            alert('Product availability updated')
            console.log('Product updated')
        },
    })

    const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
        onError: (error) => {
            alert('Error deleting product')
            console.log(error)
        },
        onCompleted: () => {
            alert('Product deleted')
            console.log('Product deleted')
        },
    })

    const deleteProductHandler = () => {
        try {
            deleteProduct({
                variables: {
                    id: product.id,
                },
            })
            onDelete(product.id)
        } catch (error) {
            alert('Error deleting product')
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
            setIsProductAvailable(!isProductAvailable)
        } catch (error) {
            alert('Error updating product availability')
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
                    {isProductAvailable ? 'Available' : 'Unavailable'}
                </button>

                <button type="button" onClick={deleteProductHandler}>
                    {' '}
                    X{' '}
                </button>
            </div>
        </li>
    )
}

export default SingleProduct
