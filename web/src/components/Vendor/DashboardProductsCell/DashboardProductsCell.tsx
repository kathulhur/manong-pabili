import { useState } from 'react'
import type { CreateProductInput, DashboardProductsQuery } from 'types/graphql'
import { Link, routes } from '@redwoodjs/router'
import {
    type CellSuccessProps,
    type CellFailureProps,
    useMutation,
} from '@redwoodjs/web'
import DashboardProduct from '../DashboardProduct/DashboardProduct'
import CreateProductModal from 'src/components/Modals/CreateProductModal'
import { useAuth } from 'src/auth'
import { toast } from '@redwoodjs/web/toast'
import { PlusIcon } from '@heroicons/react/20/solid'
import Button from 'src/components/Button/Button'
import { CREATE_PRODUCT_MUTATION } from 'src/components/Admin/Product/NewProduct'

export const QUERY = gql`
    query DashboardProductsQuery($userId: Int!) {
        dashboardProducts: productsByUser(userId: $userId) {
            __typename
            id
            name
            availability
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
            console.error(error)
        },
        onCompleted: () => {
            toast.success('Product created')
            setIsCreateProductModalOpen(false)
        },
        update: (cache, { data: { createProduct: newProduct } }) => {
            if (newProduct) {
                cache.modify({
                    fields: {
                        productsByUser: (existingDashboardProducts = []) => {
                            const newProductRef = cache.writeFragment({
                                id: newProduct.__typename + ':' + newProduct.id,
                                data: newProduct,
                                fragment: gql`
                                    fragment NewProduct on Product {
                                        id
                                        name
                                        availability
                                    }
                                `,
                            })
                            return [newProductRef, ...existingDashboardProducts]
                        },
                    },
                })
            }
        },
    })

    const onCreateProductModalSubmit = async (input: CreateProductInput) => {
        try {
            await createProduct({
                variables: {
                    input,
                },
            })
        } catch (error) {
            console.error(error)
            alert('Error creating product')
        }
    }

    return (
        <div className="text-center">
            <p className="mb-6">
                You haven't added a product yet.
                <br />
                Give it a try by adding one.
            </p>
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
    const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
        useState(false)

    const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
        onError: (error) => {
            error.graphQLErrors.map(({ message }) => {
                toast.error(message)
            })
        },
        onCompleted: () => {
            toast.success('Product created')
            setIsCreateProductModalOpen(false)
        },
        update: (cache, { data: { createProduct: newProduct } }) => {
            if (newProduct) {
                cache.modify({
                    fields: {
                        productsByUser: (existingDashboardProducts = []) => {
                            const newProductRef = cache.writeFragment({
                                id: newProduct.__typename + ':' + newProduct.id,
                                data: newProduct,
                                fragment: gql`
                                    fragment NewProduct on Product {
                                        id
                                        name
                                        availability
                                    }
                                `,
                            })
                            return [newProductRef, ...existingDashboardProducts]
                        },
                    },
                })
            }
        },
    })

    const onCreateProductModalSubmit = async (input: CreateProductInput) => {
        try {
            await createProduct({
                variables: {
                    input,
                },
            })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="my-8">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Products</h2>
                <Button
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() =>
                        setIsCreateProductModalOpen(!isCreateProductModalOpen)
                    }
                >
                    Add Product
                </Button>
                <CreateProductModal
                    isOpen={isCreateProductModalOpen}
                    onClose={() => setIsCreateProductModalOpen(false)}
                    onSubmit={onCreateProductModalSubmit}
                />
            </div>
            <ul className="my-8">
                {dashboardProducts.map((product) => (
                    <li key={product.id} className="my-4">
                        <DashboardProduct product={product} />
                    </li>
                ))}
            </ul>

            <Link to={routes.vendorProducts()}>
                <Button variant="secondary" fullWidth>
                    Manage products
                </Button>
            </Link>
        </div>
    )
}
