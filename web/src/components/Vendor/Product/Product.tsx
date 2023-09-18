import {
    Product as ProductType,
    UpdateProductAvailabilityMutationVariables,
} from 'types/graphql'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { DELETE_PRODUCT_MUTATION } from 'src/components/Admin/Product/Product'
import Button from 'src/components/Button/Button'
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
    product: Pick<ProductType, 'id' | 'name' | 'availability'>
}) => {
    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error updating product availability')
        },
        onCompleted: () => {
            toast.success('Product availability updated')
        },
    })

    const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error deleting product')
        },
        onCompleted: () => {
            toast.success('Product deleted')
        },
        update: (cache, { data }) => {
            const deletedProductId = data?.softDeleteProduct?.id
            if (deletedProductId) {
                cache.modify({
                    fields: {
                        productsByUser: (
                            existingProductsRefs,
                            { readField }
                        ) => {
                            return existingProductsRefs.filter(
                                (productRef) =>
                                    deletedProductId !==
                                    readField('id', productRef)
                            )
                        },
                    },
                })
            }
        },
    })

    const deleteProductHandler = async () => {
        try {
            if (confirm('Are you sure you want to delete this product?')) {
                await deleteProduct({
                    variables: {
                        id: product.id,
                    },
                })
            }
        } catch (error) {
            toast.error('Error deleting product')
        }
    }

    const updateProductAvailability = async (
        input: UpdateProductAvailabilityMutationVariables
    ) => {
        await updateProduct({
            variables: input,
            onError: (error) => {
                toast.error('Error updating product availability')
            },
        })
    }

    const productAvailabilityButtonHandler = () => {
        try {
            updateProductAvailability({
                id: product.id,
                input: {
                    availability: !product.availability,
                },
            })
        } catch (error) {
            toast.error('Error updating product availability')
        }
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">
                    {product.name}
                </span>
                <div className="flex items-center space-x-4">
                    <Button
                        type="button"
                        variant="subtle"
                        onClick={productAvailabilityButtonHandler}
                    >
                        {product.availability ? 'Available' : 'Unavailable'}
                    </Button>

                    <Button
                        icon={<XMarkIcon />}
                        variant="subtle"
                        className="text-red-700"
                        aria-label="Delete"
                        onClick={deleteProductHandler}
                    ></Button>
                </div>
            </div>
        </div>
    )
}

export default Product
