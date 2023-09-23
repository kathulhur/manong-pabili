import {
    ArrowTopRightOnSquareIcon,
    ArrowUpOnSquareStackIcon,
    ArrowUpRightIcon,
    PencilSquareIcon,
} from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'
import { truncate } from 'src/lib/formatters'
import { Image, User } from 'types/graphql'

export interface TableProps {
    images: (Pick<Image, 'id' | 'title' | 'url'> & {
        user: Pick<User, 'id' | 'username'>
    })[]
    user: Pick<User, 'id' | 'username'>
}
const people = [
    {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        email: 'lindsay.walton@example.com',
        role: 'Member',
    },
    // More people...
]

const Table = ({ images, user }: TableProps) => {
    return (
        <div className="my-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Images
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the images uploaded by user
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        <span className="sr-only">Links</span>
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        URL
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
                            <tbody className="divide-y divide-gray-200">
                                {images.map((image) => (
                                    <tr key={image.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            <div className="max-w-fit">
                                                <Link
                                                    to={routes.adminImage({
                                                        id: image.id,
                                                        tab: 'images',
                                                    })}
                                                    className="text-gray-700 hover:text-gray-500"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                                    <span className="sr-only">
                                                        {image.title}
                                                    </span>
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {image.title}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <a
                                                href={image.url}
                                                className="text-gray-700 hover:text-gray-500"
                                                target="_blank"
                                            >
                                                <ArrowUpRightIcon className="w-5 h-5 sm:hidden" />
                                                <span className="hidden sm:block">
                                                    {image.url}
                                                </span>
                                            </a>
                                        </td>
                                        {!user && (
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <Link
                                                    to={routes.adminUser({
                                                        id: image.user.id,
                                                        tab: 'users',
                                                    })}
                                                    className="text-gray-700 hover:text-gray-500"
                                                >
                                                    <span className="flex">
                                                        {image.user.username}
                                                        <ArrowUpRightIcon className="w-5 h-5" />
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
            </div>
        </div>
    )
}

export default Table
