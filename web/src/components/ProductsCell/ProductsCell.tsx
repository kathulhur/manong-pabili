import { CreateProductInput, CreateProductMutation, CreateProductMutationVariables, type ProductsQuery } from 'types/graphql'

import {
    type CellSuccessProps,
    type CellFailureProps,
    useMutation,
} from '@redwoodjs/web'
import Product from '../Product/Product'
import { useState } from 'react'
import { useAuth } from 'src/auth'
import CreateProductModal from '../Modals/CreateProductModal'
import { toast } from '@redwoodjs/web/dist/toast'

export const QUERY = gql`
    query ProductsQuery($userId: Int!) {
        productsByUser(userId: $userId) {
            id
            name
            availability
        }
    }
`


const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProductMutation($input: CreateProductInput!) {
        createProduct(input: $input) {
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
    const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
        useState(false)

    const [createProduct] = useMutation<CreateProductMutation, CreateProductMutationVariables>(CREATE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error creating product')
            console.log(error)
        },
        onCompleted: () => {
            toast.success('Product created')
            setIsCreateProductModalOpen(false)
        },
        update: (cache, { data }) => {
            const newProduct = data?.createProduct
            if (newProduct) {
                cache.modify({
                    fields: {
                        productsByUser: (existingProductsRefs = [], { readField }) => {
                            const newProductRef = cache.writeFragment({
                                data: newProduct,
                                fragment: gql`
                                    fragment NewProduct on Product {
                                        id
                                        name
                                        availability
                                    }
                                `,
                            })
                            return [newProductRef, ...existingProductsRefs]
                        },
                    },
                })
            }
        }
    })

    const onCreateProductModalSubmit = async (input: CreateProductInput) => {
        try {
            await createProduct({
                variables: {
                    input,
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <div className='py-8'>
        <div className='flex justify-between items-center'>
            <h1 className='text-xl font-bold'>Products</h1>
            <div>
                <button
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    type="button"
                    onClick={() =>
                        setIsCreateProductModalOpen(!isCreateProductModalOpen)
                    }
                >
                    Add Product
                </button>
                <CreateProductModal
                    isOpen={isCreateProductModalOpen}
                    onClose={() => setIsCreateProductModalOpen(false)}
                    onSubmit={onCreateProductModalSubmit}
                />

            </div>
        </div>
        <ul>
            {productsByUser.map((product) => (
                <li key={product.id} className='my-4'>
                    <Product product={product} />
                </li>
            ))}
        </ul>
    </div>
    )
}