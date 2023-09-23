import {
    Product as ProductType,
    UpdateProductAvailabilityMutationVariables,
} from 'types/graphql'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import ConfirmationModal from 'src/components/Modals/ConfirmationModal'
import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { Menu, Transition } from '@headlessui/react'
import dayjs from 'dayjs'

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
    mutation DeleteVendorProductMutation($id: Int!) {
        softDeleteProduct(id: $id) {
            id
        }
    }
`

const Product = ({
    product,
}: {
    product: Pick<ProductType, 'id' | 'name' | 'availability' | 'createdAt'>
}) => {
    const [isConfirmationModalOpen, setIsCreateProductModalOpen] =
        useState(false)

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
            await deleteProduct({
                variables: {
                    id: product.id,
                },
            })
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
        <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {product.name}
                    </p>
                    <p
                        className={clsx(
                            product.availability
                                ? 'text-emerald-700 bg-emerald-50 ring-emerald-600/20'
                                : 'text-gray-600 bg-gray-50 ring-gray-500/10',
                            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                        )}
                    >
                        {product.availability ? 'Available' : 'Unavailable'}
                    </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                        Created at{' '}
                        {dayjs(product.createdAt).format('MMM D, YYYY')}
                    </p>
                </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            {[
                                {
                                    label: product.availability
                                        ? 'Unavailable'
                                        : 'Available',
                                    onClick: productAvailabilityButtonHandler,
                                },
                                {
                                    label: 'Delete',
                                    onClick: () =>
                                        setIsCreateProductModalOpen(true),
                                },
                            ].map(({ label, onClick }) => {
                                return (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <span
                                                onClick={onClick}
                                                className={clsx(
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900 cursor-default'
                                                )}
                                            >
                                                {label}
                                            </span>
                                        )}
                                    </Menu.Item>
                                )
                            })}
                        </Menu.Items>
                    </Transition>
                </Menu>
                <ConfirmationModal
                    title="Delete product"
                    description="Are you sure you want to delete this product?"
                    confirmationButtonTitle="Delete"
                    isOpen={isConfirmationModalOpen}
                    onClose={() => setIsCreateProductModalOpen(false)}
                    onConfirm={deleteProductHandler}
                />
            </div>
        </li>
    )
}

export default Product
