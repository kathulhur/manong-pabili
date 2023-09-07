import { useState } from 'react'
import { ProductsQuery, UpdateProductAvailabilityMutationVariables } from 'types/graphql'
import { useMutation } from '@redwoodjs/web'
import { QUERY as PRODUCTS_CELL_QUERY } from '../ProductsCell'
import { toast } from '@redwoodjs/web/dist/toast'

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UpdateProductAvailabilityMutation(
        $id: Int!
        $input: UpdateProductInput!
    ) {
        updateProduct(id: $id, input: $input) {
            id
            availability
        }
    }
`

const DELETE_PRODUCT_MUTATION = gql`
    mutation DeleteProductMutation($id: Int!) {
        deleteProduct: softDeleteProduct(id: $id) {
            id
        }
    }
`


const Product = ({
  product,
}: {
  product: ProductsQuery['productsByUser'][0]
}) => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error updating product availability')
            console.log(error)
        },
        onCompleted: () => {
            toast.success('Product availability updated')
        },
  })

  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
        onError: (error) => {
            console.log(error)
            toast.error('Error deleting product')
        },
        onCompleted: () => {
            toast.success('Product deleted')
        },
        update: (cache, { data }) => {
            const deletedProductId = data?.deleteProduct?.id
            if (deletedProductId) {
                cache.modify({
                    fields: {
                        productsByUser: (existingProductsRefs, { readField }) => {
                            return existingProductsRefs.filter(
                                (productRef) => deletedProductId !== readField('id', productRef)
                            )
                        },
                    },
                })
            }
        }
  })

  const deleteProductHandler = async () => {
        try {
            if(confirm('Are you sure you want to delete this product?')) {
                await deleteProduct({
                    variables: {
                        id: product.id,
                    },
                })
            }
        } catch (error) {
            toast.error('Error deleting product')
            console.log(error)
        }
  }

  const updateProductAvailability = async (input: UpdateProductAvailabilityMutationVariables) => {
        await updateProduct({
            variables: input,
            onError: (error) => {
                toast.error('Error updating product availability')
                console.log(error)
            },

        })
  }

  const productAvailabilityButtonHandler = () => {
      try {
            updateProductAvailability({id: product.id, input: {
                availability: !product.availability
            }})
        } catch (error) {
            toast.error('Error updating product availability')
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
                    {product.availability ? 'Available' : 'Unavailable'}
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
