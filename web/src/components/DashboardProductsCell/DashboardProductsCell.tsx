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
import { toast } from '@redwoodjs/web/toast'
import { PlusIcon } from '@heroicons/react/20/solid'
import Button from '../Button/Button'


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
            toast.error('Error creating product')
            console.log(error)
        },
        onCompleted: () => {
            toast.success('Product created')
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
        <div className='text-center'>
            <p className='mb-6'>You haven't added a product yet.<br/>Give it a try by adding one.</p>
            <Button
                type="button"
                onClick={() =>
                    setIsCreateProductModalOpen(!isCreateProductModalOpen)
                }
                fullWidth
            >
                Add Product
            </Button>
            <CreateProductModal
                isOpen={isCreateProductModalOpen}
                onClose={() => setIsCreateProductModalOpen(false)}
                onSubmit={onCreateProductModalSubmit}
            />
        </div>
    )
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
            toast.success('Product created')
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
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-lg'>Products</h2>
                <Button
                    type="button"
                    aria-label='Add Product'
                    onClick={() =>
                        setIsCreateProductModalOpen(!isCreateProductModalOpen)
                    }
                >
                    <PlusIcon className="h-7 w-7 text-slate-100"/>
                </Button>
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

            <Link to={routes.products()}>
                <Button fullWidth>Go to products page</Button>
            </Link>
        </div>
    )
}
