import {
    ArrowTopRightOnSquareIcon,
    ArrowUpRightIcon,
    PencilSquareIcon,
} from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'
import { checkboxInputTag, formatDatetime, truncate } from 'src/lib/formatters'
import { Marker } from 'types/graphql'

export interface TableProps {
    markers: (Pick<
        Marker,
        | 'id'
        | 'url'
        | 'userId'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'deleted'
    > & {
        user: Pick<Marker['user'], 'id' | 'username'>
    })[]
    user?: Pick<Marker['user'], 'id' | 'username'>
}

const Table = ({ markers, user }: TableProps) => {
    return (
        <div className="my-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Markers
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the markers
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Marker
                    </button>
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
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Marker
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
                                {markers.map((marker) => (
                                    <tr key={marker.id}>
                                        <td>
                                            <div className="flex flex-col">
                                                <Link
                                                    to={routes.adminMarker({
                                                        id: marker.id,
                                                    })}
                                                    className="text-gray-400 hover:text-gray-700"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-5 h-5 " />
                                                </Link>
                                                <Link
                                                    to={routes.adminEditMarker({
                                                        id: marker.id,
                                                    })}
                                                    className="mt-1 text-gray-400 hover:text-gray-700"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <img
                                                className="w-10 h-10 rounded-full ring-2 ring-gray-400"
                                                src={marker.url}
                                                alt=""
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <a
                                                href={marker.url}
                                                target="_blank"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <span className="hidden sm:block">
                                                    {truncate(marker.url)}
                                                </span>
                                                <ArrowUpRightIcon className="w-5 h-5 text-gray-400 sm:hidden" />
                                            </a>
                                        </td>
                                        {!user && (
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <Link
                                                    to={routes.adminUser({
                                                        id: marker.user.id,
                                                    })}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <span className="flex">
                                                        <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400" />
                                                        {marker.user.username}
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
