import {
    ArrowTopRightOnSquareIcon,
    ArrowUpRightIcon,
    LinkIcon,
    PencilSquareIcon,
} from '@heroicons/react/20/solid'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Product, User as UserType } from 'types/graphql'

export interface TableProps {
    products: (Pick<Product, 'id' | 'name' | 'availability'> & {
        user: Pick<UserType, 'id' | 'username'>
    })[]
    user: Pick<UserType, 'username'>
}

const Table = ({ products, user }: TableProps) => {
    return (
        <div className="my-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Products
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing
                    </p>
                </div>
            </div>
            <div className="mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="relative py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                <LinkIcon className="h-5 w-5 text-gray-400" />
                                <span className="sr-only">Links</span>
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Available
                            </th>
                            {!user && (
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Owner
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className="max-w-fit">
                                        <Link
                                            to={routes.adminProduct({
                                                id: product.id,
                                                tab: 'products',
                                            })}
                                        >
                                            <ArrowTopRightOnSquareIcon
                                                className="h-5 w-5 text-gray-400 hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    </div>
                                </td>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                    {product.name}
                                    <dl className="font-normal sm:hidden">
                                        <dt className="sr-only">
                                            Availability
                                        </dt>
                                        <dd className="mt-1 truncate text-gray-700">
                                            {product.availability
                                                ? 'Available'
                                                : 'Unavailable'}
                                        </dd>
                                    </dl>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-700 sm:table-cell">
                                    {product.availability ? 'Yes' : 'No'}
                                </td>
                                {!user && (
                                    <td className="px-3 py-4 text-sm font-medium text-gray-500">
                                        <Link
                                            to={routes.adminUser({
                                                id: product.user.id,
                                                tab: 'users',
                                            })}
                                            className="hover:underline hover:text-gray-600"
                                        >
                                            <span className="flex">
                                                {product.user.username}
                                                <ArrowUpRightIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
