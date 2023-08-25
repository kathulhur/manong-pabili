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
    const { currentUser } = useAuth()
    const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
        useState(false)

    const [createProduct] = useMutation<CreateProductMutation, CreateProductMutationVariables>(CREATE_PRODUCT_MUTATION, {
        onError: (error) => {
            alert('Error creating product')
            console.log(error)
        },
        onCompleted: () => {
            alert('Product created')
            setIsCreateProductModalOpen(false)
        },
        refetchQueries: [{ query: QUERY, variables: { userId: currentUser?.id } }],
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
            alert('Error creating product')
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


// const SingleProduct = ({
//     product,
// }: {
//     product: ProductsQuery['productsByUser'][number]
// }) => {
//     const { currentUser } = useAuth()

//     const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
//         onError: (error) => {
//             toast.error('Error updating product availability')
//             console.log(error)
//         },
//         onCompleted: () => {
//             toast.success('Product availability updated')
//             console.log('Product updated')
//         },
//         refetchQueries: [
//             { query: QUERY, variables: { userId: currentUser.id } },
//         ],
//     })

//     const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
//         onError: (error) => {
//             toast.error('Error deleting product')
//             console.log(error)
//         },
//         onCompleted: () => {
//             toast.success('Product deleted')
//             console.log('Product deleted')
//         },
//         refetchQueries: [
//             { query: QUERY, variables: { userId: currentUser.id } },
//         ],
//     })

//     const deleteProductHandler = () => {
//         try {
//             deleteProduct({
//                 variables: {
//                     id: product.id,
//                 },
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const updateProductAvailability = (id: number, availability: boolean) => {
//         updateProduct({
//             variables: {
//                 id,
//                 input: {
//                     availability: !availability,
//                 },
//             },
//         })
//     }

//     const productAvailabilityButtonHandler = () => {
//         try {
//             updateProductAvailability(product.id, product.availability)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <li key={product.id}>
//             <div>
//                 <span>{product.name}</span>
//                 <button
//                     type="button"
//                     onClick={productAvailabilityButtonHandler}
//                 >
//                     {product.availability ? 'Available' : 'Unavailable'}
//                 </button>

//                 <button type="button" onClick={deleteProductHandler}>
//                     {' '}
//                     X{' '}
//                 </button>
//             </div>
//         </li>
//     )
// }
