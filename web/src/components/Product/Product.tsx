import { useState } from 'react'
import { ProductsQuery, UpdateProductAvailabilityMutationVariables } from 'types/graphql'
import { useMutation } from '@redwoodjs/web'
import { QUERY as PRODUCTS_CELL_QUERY } from '../ProductsCell'
import { toast } from '@redwoodjs/web/dist/toast'
import { DELETE_PRODUCT_MUTATION } from '../Admin/Product/Product'
import Button from '../Button/Button'
import { XMarkIcon } from '@heroicons/react/20/solid'

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
            const deletedProductId = data?.softDeleteProduct?.id
            console.log(data)
            if (deletedProductId) {
                cache.modify({
                    fields: {
                        productsByUser: (existingProductsRefs, { readField }) => {
                            console.log(existingProductsRefs)
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
    <div>
        <div className='flex justify-between items-center'>
            <span className='font-semibold text-slate-700'>{product.name}</span>
            <div className='flex items-center space-x-4'>
                <Button
                    type="button"
                    variant='subtle'
                    onClick={productAvailabilityButtonHandler}
                    >
                    {product.availability ? 'Available' : 'Unavailable'}
                </Button>

                <Button
                    icon={<XMarkIcon />}
                    variant='subtle'
                    className='text-red-700'
                    aria-label='Delete'
                    onClick={deleteProductHandler}>
                </Button>
            </div>
        </div>
    </div>
  )
};

export default Product;
