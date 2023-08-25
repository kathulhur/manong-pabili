import { useState } from 'react'
import { ProductsQuery, UpdateProductAvailabilityMutationVariables } from 'types/graphql'
import { useMutation } from '@redwoodjs/web'
import { QUERY as PRODUCTS_CELL_QUERY } from '../ProductsCell'

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


const Product = ({
  product,
}: {
  product: ProductsQuery['productsByUser'][0]
}) => {
  const [isProductAvailable, setIsProductAvailable] = useState(
    product.availability
  )
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        refetchQueries: [PRODUCTS_CELL_QUERY],
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
        refetchQueries: [PRODUCTS_CELL_QUERY],
        onError: (error) => {
            alert('Error deleting product')
            console.log(error)
        },
        onCompleted: () => {
            alert('Product deleted')
            console.log('Product deleted')
        },
  })

  const deleteProductHandler = async () => {
        try {
            await deleteProduct({
                variables: {
                    id: product.id,
                },
            })
        } catch (error) {
            alert('Error deleting product')
            console.log(error)
        }
  }

  const updateProductAvailability = async (input: UpdateProductAvailabilityMutationVariables) => {
        await updateProduct({
            variables: input
        })
  }

  const productAvailabilityButtonHandler = () => {
      try {
            updateProductAvailability({id: product.id, input: {
                availability: product.availability
            }})
            setIsProductAvailable(!isProductAvailable)
        } catch (error) {
            alert('Error updating product availability')
            console.log(error)
        }
  }
  return (
    <div className='p-4 border'>
        <div className='flex justify-between items-center'>
            <span>{product.name}</span>
            <div className='space-x-4'>
                <button
                    className='border py-2 px-4 rounded-md'
                    type="button"
                    onClick={productAvailabilityButtonHandler}
                    >
                    {isProductAvailable ? 'Available' : 'Unavailable'}
                </button>

                <button
                    className='border py-2 px-4 rounded-md'
                    type="button" onClick={deleteProductHandler}>
                    {' '}
                    X{' '}
                </button>
            </div>
        </div>
    </div>
  )
};

export default Product;
