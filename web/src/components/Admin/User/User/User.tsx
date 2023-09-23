import { PaperClipIcon } from '@heroicons/react/20/solid'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import clsx from 'clsx'
import FeaturedImage from 'src/components/Vendor/FeaturedImage/FeaturedImage'

import {
    DeleteUserMutation,
    DeleteUserMutationVariables,
    User as UserType,
} from 'types/graphql'

export const DELETE_USER_MUTATION = gql`
    mutation DeleteUserMutation($id: Int!) {
        softDeleteUser(id: $id) {
            id
        }
    }
`

interface UserProps {
    user: Pick<
        UserType,
        | 'id'
        | 'name'
        | 'email'
        | 'username'
        | 'roles'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'deleted'
        | 'mobileNumber'
        | 'gender'
        | 'latitude'
        | 'longitude'
        | 'lastLocationUpdate'
        | 'locationHidden'
        | 'verified'
        | 'markerUrl'
        | 'locationBroadcastMode'
    > & {
        featuredImages: Pick<
            UserType['featuredImages'][number],
            'id' | 'title' | 'url'
        >[]
        Markers: Pick<UserType['Markers'][number], 'id' | 'url'>[]
    }
}

const User = ({ user }: UserProps) => {
    const [deleteUser] = useMutation<
        DeleteUserMutation,
        DeleteUserMutationVariables
    >(DELETE_USER_MUTATION, {
        onCompleted: () => {
            toast.success('User deleted')
            navigate(routes.adminUsers())
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onDeleteClick = (id: DeleteUserMutationVariables['id']) => {
        if (confirm('Are you sure you want to delete user ' + id + '?')) {
            deleteUser({ variables: { id } })
        }
    }

    return (
        <div>
            <div className="px-4 sm:px-0">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                            User Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Personal details and information
                        </p>
                    </div>
                    <dl>
                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:text-right">
                            Verification status
                        </dt>
                        <dd className="sm:text-right">
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
                                {user.verified ? 'Verified' : 'Unverified'}
                            </span>
                        </dd>
                    </dl>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100 sm:grid sm:grid-cols-2">
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.name}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Username
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.username}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            margotfoster@example.com
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Mobile Number
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.mobileNumber}
                        </dd>
                    </div>
                    <div className="col-span-2 bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Location Information
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
                            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="">
                                    <dt className="text-sm font-medium leading-6 text-gray-500">
                                        Visibility
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-900 sm:mt-0">
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
                                    </dd>
                                </div>
                                <div className="">
                                    <dt className="text-sm font-medium leading-6 text-gray-500">
                                        Broadcast Mode
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-900 sm:mt-0">
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
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-500">
                                        Latitude
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-900 sm:mt-0">
                                        {user.latitude || 'N/A'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-500">
                                        Longitude
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-900 sm:mt-0">
                                        {user.longitude || 'N/A'}
                                    </dd>
                                </div>
                            </dl>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Featured Images
                        </dt>
                        <dd className="col-span-2 sm:grid sm:grid-cols-2 sm:gap-8">
                            {user.featuredImages.map((images) => (
                                <div
                                    key={images.id}
                                    className="group relative max-w-sm"
                                >
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={images.url}
                                            alt={images.title}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a
                                                    href={images.url}
                                                    target="_blank"
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-0"
                                                    />
                                                    {images.title}
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {user.Markers.length === 0 && (
                                <div className="">
                                    <span className="text-gray-500 text-sm">
                                        No featured Images
                                    </span>
                                </div>
                            )}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Markers
                        </dt>
                        <dd className="sm:col-span-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {user.Markers.map((images) => (
                                <a
                                    key={images.id}
                                    href={images.url}
                                    target="_blank"
                                    className="hover:opacity-75 inline-block w-16"
                                >
                                    <div className=" aspect-h-1 aspect-w-1 w-full ring-1 ring-gray-600 ring-inset overflow-hidden rounded-full bg-gray-200 lg:aspect-none group-hover:opacity-75">
                                        <img
                                            src={images.url}
                                            alt={'marker'}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                </a>
                            ))}
                            {user.Markers.length === 0 && (
                                <div className="">
                                    <span className="text-gray-500 text-sm">
                                        No Markers
                                    </span>
                                </div>
                            )}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default User
