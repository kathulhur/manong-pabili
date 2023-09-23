import {
    ArrowTopRightOnSquareIcon,
    ArrowUpRightIcon,
    LinkIcon,
} from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'
import clsx from 'clsx'
import { User as UserType } from 'types/graphql'

export interface TableProps {
    users: Pick<
        UserType,
        | 'verified'
        | 'id'
        | 'email'
        | 'username'
        | 'name'
        | 'gender'
        | 'mobileNumber'
        | 'roles'
        | 'lastLocationUpdate'
        | 'locationHidden'
        | 'locationBroadcastMode'
        | 'markerUrl'
    >[]
}

const Table = ({ users }: TableProps) => {
    return (
        <div className="my-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Users
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their
                        name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        to={routes.adminNewUser()}
                        className="block rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add user
                    </Link>
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
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        <LinkIcon className="w-5 h-5" />
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Username
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Verification Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Visibility
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Location broadcast mode
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Products
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Featured Images
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Markers
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.map((user) => (
                                    <tr key={user.email}>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 sm:pl-0">
                                            <div className="flex flex-col text-gray-400">
                                                <Link
                                                    className="hover:text-gray-500"
                                                    to={routes.adminUser({
                                                        id: user.id,
                                                        tab: 'users',
                                                    })}
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img
                                                        className="h-11 w-11 rounded-full"
                                                        src={user.markerUrl}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                    <div className="mt-1 text-gray-500">
                                                        {user.mobileNumber}
                                                    </div>
                                                    <div className="mt-1 text-gray-500">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">
                                                {user.username}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">
                                                <span
                                                    className={clsx({
                                                        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ':
                                                            true,
                                                        'text-emerald-700 ring-1 ring-inset ring-emerald-600/20 bg-emerald-50':
                                                            user.verified,
                                                        'text-red-700 ring-1 ring-inset ring-red-600/20 bg-red-50':
                                                            !user.verified,
                                                    })}
                                                >
                                                    {user.verified
                                                        ? 'Verified'
                                                        : 'Unverified'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">
                                                {user.roles}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span
                                                className={clsx({
                                                    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ':
                                                        true,
                                                    'text-emerald-700 ring-1 ring-inset ring-emerald-600/20 bg-emerald-50':
                                                        !user.locationHidden,
                                                    'text-gray-700 ring-1 ring-inset ring-gray-600/20 bg-gray-50':
                                                        user.locationHidden,
                                                })}
                                            >
                                                {user.locationHidden
                                                    ? 'Hidden'
                                                    : 'Visible'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span
                                                className={clsx({
                                                    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ':
                                                        true,
                                                    'text-emerald-700 ring-1 ring-inset ring-emerald-600/20 bg-emerald-50':
                                                        user.locationBroadcastMode ===
                                                        'REALTIME',
                                                    'text-gray-700 ring-1 ring-inset ring-gray-600/20 bg-gray-50':
                                                        user.locationBroadcastMode ===
                                                            'STATIC' ||
                                                        user.locationBroadcastMode ===
                                                            'MANUAL',
                                                })}
                                            >
                                                {user.locationBroadcastMode}
                                            </span>
                                        </td>

                                        <td className="relative whitespace-nowrap px-3 py-5 text-sm font-medium">
                                            <Link
                                                to={routes.adminProducts({
                                                    userId: user.id,
                                                    tab: 'products',
                                                })}
                                                className="text-gray-700 hover:text-gray-500"
                                            >
                                                <span>
                                                    View
                                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 -mt-1" />
                                                </span>

                                                <span className="sr-only">
                                                    , {user.name}
                                                </span>
                                            </Link>
                                        </td>
                                        <td className="relative whitespace-nowrap px-3 py-5 text-sm font-medium">
                                            <Link
                                                to={routes.adminImages({
                                                    userId: user.id,
                                                    tab: 'images',
                                                })}
                                                className="text-gray-700 hover:text-gray-500"
                                            >
                                                <span>
                                                    View
                                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 -mt-1" />
                                                </span>
                                                <span className="sr-only">
                                                    , {user.name}
                                                </span>
                                            </Link>
                                        </td>
                                        <td className="relative whitespace-nowrap px-3 py-5 text-sm font-medium">
                                            <Link
                                                to={routes.adminMarkers({
                                                    userId: user.id,
                                                    tab: 'markers',
                                                })}
                                                className="text-gray-700 hover:text-gray-500"
                                            >
                                                <span>
                                                    View
                                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 -mt-1" />
                                                </span>
                                            </Link>
                                        </td>
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
