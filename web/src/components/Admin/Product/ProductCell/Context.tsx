import { useMutation } from '@redwoodjs/web'
import { createContext, useState } from 'react'
import { ProductCellQuery } from 'types/graphql'
import {
    DELETE_PRODUCT_MUTATION,
    UPDATE_PRODUCT_AVAILABILITY_MUTATION,
    UPDATE_PRODUCT_NAME_MUTATION,
} from 'src/components/Admin/Product/ProductCell/ProductCell'
import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'

export interface ProductCellContextValue {
    product: ProductCellQuery['product']

    isDeleteModalOpen: boolean
    setIsDeleteModalOpen: (isOpen: boolean) => void
    onDelete(): void

    isUpdateNameModalOpen: boolean
    setIsUpdateNameModalOpen: (isOpen: boolean) => void
    onUpdateName(name: string): void
    onUpdateNameModalClose(): void
    onUpdateAvailability(): void
}

export const ProductCellContext = createContext<ProductCellContextValue>(null)

export interface ProductCellProviderProps {
    product: ProductCellQuery['product']
    children: React.ReactNode
}

export const ProductCellContextProvider = ({
    product,
    children,
}: ProductCellProviderProps) => {
    const [isUpdateNameModalOpen, setIsUpdateNameModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
        onCompleted: () => {
            toast.success('Product deleted')
            navigate(routes.adminProducts())
        },
        onError: (error) => {
            error.graphQLErrors.forEach((e) => {
                toast.error(e.message)
            })
        },
    })

    const [updateProductName] = useMutation(UPDATE_PRODUCT_NAME_MUTATION, {
        onCompleted: () => {
            toast.success('Product name updated')
        },
        onError: (error) => {
            error.graphQLErrors.forEach((e) => {
                toast.error(e.message)
            })
        },
    })

    const [updateProductAvailability] = useMutation(
        UPDATE_PRODUCT_AVAILABILITY_MUTATION,
        {
            onCompleted: () => {
                toast.success('Product availability updated')
            },
            onError: (error) => {
                error.graphQLErrors.forEach((e) => {
                    toast.error(e.message)
                })
            },
        }
    )

    const onDelete = () => {
        if (
            confirm(
                'Are you sure you want to delete product ' + product.name + '?'
            )
        ) {
            deleteProduct({ variables: { id: product.id } })
            setIsDeleteModalOpen(false)
        }
    }

    const onUpdateName = (name: string) => {
        if (confirm('Are you sure you want to update the name?')) {
            updateProductName({ variables: { id: product.id, name } })
            setIsUpdateNameModalOpen(false)
        }
    }

    const onUpdateAvailability = () => {
        if (confirm('Are you sure you want to update the availability?')) {
            updateProductAvailability({
                variables: {
                    id: product.id,
                    availability: !product.availability,
                },
            })
            setIsUpdateNameModalOpen(false)
        }
    }

    const onUpdateNameModalClose = () => {
        setIsUpdateNameModalOpen(false)
    }

    return (
        <ProductCellContext.Provider
            value={{
                product,

                isDeleteModalOpen,
                setIsDeleteModalOpen,
                onDelete,

                isUpdateNameModalOpen,
                setIsUpdateNameModalOpen,
                onUpdateNameModalClose,
                onUpdateName,

                onUpdateAvailability,
            }}
        >
            {children}
        </ProductCellContext.Provider>
    )
}
