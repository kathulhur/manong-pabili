import { useState } from 'react'
import type { CreateProductInput, DashboardProductsQuery } from 'types/graphql'
import { Link, routes } from '@redwoodjs/router'
import {
    type CellSuccessProps,
    type CellFailureProps,
    useMutation,
} from '@redwoodjs/web'
import DashboardProduct from '../DashboardProduct/DashboardProduct'
import CreateProductModal from '../Modals/CreateProductModal'
import { useAuth } from 'src/auth'


export const QUERY = gql`
    query DashboardProductsQuery($userId: Int!) {
        dashboardProducts: productsByUser(userId: $userId) {
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

export const Empty = () => {
    const { currentUser } = useAuth()

    const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
        useState(false)

    const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
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

    return <>
        <div>
            <button
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
            <p></p>Empty

        </div>
    </>
}

export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)


export const Success = ({
    dashboardProducts,
}: CellSuccessProps<DashboardProductsQuery>) => {
    const { currentUser } = useAuth()
    const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
        useState(false)

    const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
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
        <div className='my-8'>
            <div className='flex justify-between'>
                <h2 className='font-semibold text-lg'>Mga Produkto</h2>
                <button
                    className='border py-2 px-4 rounded-md'
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
            <ul className='my-8'>
                {dashboardProducts.map((product) => (
                    <li key={product.id} className='my-4'>
                        <DashboardProduct product={product} />
                    </li>
                ))}
            </ul>
            <Link
                className='border py-2 px-4 rounded-md'
                to={routes.products()}
            >
                visit products page
            </Link>
        </div>
    )
}
