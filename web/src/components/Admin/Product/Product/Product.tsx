import { useContext } from 'react'
import { formatDatetime } from 'src/lib/formatters'

import type {
    DeleteProductMutationVariables,
    Product as ProductType,
} from 'types/graphql'
import { ProductCellContext } from '../ProductCell/Context'
import SingleInputModalString from 'src/components/Modals/SingleInputModalString'
import Button from 'src/components/Button'
import ConfirmationModal from 'src/components/Modals/ConfirmationModal'
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'

export interface ProductProps {
    product: Pick<
        ProductType,
        | 'id'
        | 'name'
        | 'availability'
        | 'userId'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
    > & {
        user: Pick<ProductType['user'], 'id' | 'username'>
    }
}

const Product = () => {
    const context = useContext(ProductCellContext)
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Product Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Product details
                </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Product ID
                        </dt>
                        <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">
                                {context?.product.id}
                            </span>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Product Name
                        </dt>
                        <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">
                                {context?.product.name}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500"
                                    onClick={() => {
                                        context.setIsUpdateNameModalOpen(true)
                                    }}
                                >
                                    Update
                                </button>
                                <SingleInputModalString
                                    isOpen={context?.isUpdateNameModalOpen}
                                    label="Update Product Name"
                                    defaultValue={context?.product?.name}
                                    onClose={() => {
                                        context?.onUpdateNameModalClose()
                                    }}
                                    onSubmit={context?.onUpdateName}
                                />
                            </span>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Available
                        </dt>
                        <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">
                                {context?.product.availability ? 'Yes' : 'No'}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500"
                                >
                                    Update
                                </button>
                            </span>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Owner
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 hover:text-gray-500">
                            <Link
                                to={routes.adminUser({
                                    id: context?.product.user.id,
                                    tab: 'users',
                                })}
                            >
                                <span>
                                    {context?.product.user.username}
                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 -mt-1" />
                                </span>
                            </Link>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Other Details
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 sm:mt-0">
                            <dl className="grid gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Created At
                                    </dt>
                                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {formatDatetime(
                                            context?.product.createdAt
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Updated At
                                    </dt>
                                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {formatDatetime(
                                            context?.product.updatedAt
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Deleted At
                                    </dt>
                                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {formatDatetime(
                                            context?.product.deletedAt
                                        ) || (
                                            <span className="text-gray-400">
                                                Not deleted
                                            </span>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </dd>
                    </div>
                </dl>
                <section className="p-4 border border-dashed border-red-700 rounded-lg mt-16">
                    <h2 className="mb-4 font-semibold text-red-700">
                        Danger Zone
                    </h2>
                    <Button
                        variant="danger"
                        onClick={() => context?.setIsDeleteModalOpen(true)}
                    >
                        Delete Product
                    </Button>
                    <ConfirmationModal
                        isOpen={context?.isDeleteModalOpen}
                        onClose={() => context?.setIsDeleteModalOpen(false)}
                        onConfirm={() => context?.onDelete()}
                        title="Delete Product"
                        description="Are you sure you want to delete this product? This action cannot be undone."
                        confirmationButtonTitle="Delete"
                    />
                </section>
            </div>
        </div>
    )
}

export default Product
