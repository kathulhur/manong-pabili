import { useState } from 'react'

import { Props } from 'react-modal'
import Modal from 'react-modal'
import type { DashboardProductsQuery } from 'types/graphql'

import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import {
    type CellSuccessProps,
    type CellFailureProps,
    useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
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

Modal.setAppElement('#redwood-app')

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

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

export const Success = ({
    dashboardProducts,
    userId,
}: CellSuccessProps<DashboardProductsQuery> & { userId: number }) => {
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
        refetchQueries: [{ query: QUERY, variables: { userId } }],
    })

    const onCreateProductModalSubmit = (data: { name: string }) => {
        createProduct({
            variables: {
                input: {
                    name: data.name,
                    availability: false,
                    userId,
                },
            },
        })
    }

    return (
        <>
            <button
                type="button"
                onClick={() =>
                    setIsCreateProductModalOpen(!isCreateProductModalOpen)
                }
            >
                Add Product
            </button>
            <CreateProductModal
                onRequestClose={() => setIsCreateProductModalOpen(false)}
                isOpen={isCreateProductModalOpen}
                onSubmit={onCreateProductModalSubmit}
            />
            <ul>
                {dashboardProducts.map((product) => (
                    <li key={product.id}>
                        <DashboardProduct product={product} userId={userId} />
                    </li>
                ))}
            </ul>
            <Link to={routes.products()}>visit products page</Link>
        </>
    )
}

const DashboardProduct = ({
    product,
    userId,
}: {
    product: DashboardProductsQuery['dashboardProducts'][number]
    userId: number
}) => {
    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error updating product availability')
            console.log(error)
        },
        onCompleted: () => {
            toast.success('Product availability updated')
            console.log('Product updated')
        },
        refetchQueries: [{ query: QUERY, variables: { userId } }],
    })

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
        } catch (error) {
            alert('Error updating product availability')
            console.log(error)
        }
    }
    return (
        <div>
            <div>
                <span>{product.name}</span>
                <button
                    type="button"
                    onClick={productAvailabilityButtonHandler}
                >
                    {product.availability ? 'Available' : 'Unavailable'}
                </button>
            </div>
        </div>
    )
}

const CreateProductModal = ({
    isOpen,
    onRequestClose,
    onSubmit,
    id,
}: Props & { onSubmit: (data: any) => void }) => {
    const [name, setName] = useState('')

    return (
        <Modal
            id={id}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Product"
        >
            <Form onSubmit={onSubmit}>
                <Label name="name" className="label" errorClassName="error" />
                <TextField
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    validation={{ required: true }}
                />
                <FieldError name="name" className="error-message" />

                <Submit className="button">Add Product</Submit>
            </Form>
        </Modal>
    )
}
