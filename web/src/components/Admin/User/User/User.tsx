import {
    ArrowUpRightIcon,
    PaperClipIcon,
    PencilSquareIcon,
} from '@heroicons/react/20/solid'
import { Link, routes, navigate } from '@redwoodjs/router'
import clsx from 'clsx'
import Button from 'src/components/Button/Button'

import { User as UserType } from 'types/graphql'
import { UserCellContext } from '../UserCell/Context'
import { useContext } from 'react'
import ConfirmationModal from 'src/components/Modals/ConfirmationModal'
import SingleInputModalString from 'src/components/Modals/SingleInputModalString'

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

const User = () => {
    const context = useContext(UserCellContext)
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
                                        context?.user.verified,
                                    'text-red-700 ring-1 ring-inset ring-red-600/20 bg-red-50':
                                        !context?.user.verified,
                                })}
                            >
                                {context?.user.verified
                                    ? 'Verified'
                                    : 'Unverified'}
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
                            {context?.user.name}
                            <button
                                onClick={() => {
                                    context?.toggleUpdateNameModal()
                                }}
                                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                            >
                                <PencilSquareIcon className="w-4 h-4 inline-block fill-orange-600 hover:fill-orange-500" />
                            </button>
                            <SingleInputModalString
                                defaultValue={context?.user.name}
                                isOpen={context?.isUpdateNameModalOpen}
                                onClose={() => {
                                    context?.toggleUpdateNameModal()
                                }}
                                label="Update Name"
                                onSubmit={(value) => {
                                    context?.onUpdateName(value)
                                }}
                            />
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Username
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {context?.user.username}
                            <button
                                onClick={() => {
                                    context?.toggleUpdateUsernameModal()
                                }}
                                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                            >
                                <PencilSquareIcon className="w-4 h-4 inline-block fill-orange-600" />
                            </button>
                            <SingleInputModalString
                                defaultValue={context?.user.username}
                                isOpen={context?.isUpdateUsernameModalOpen}
                                onClose={() => {
                                    context?.toggleUpdateUsernameModal()
                                }}
                                label="Update Username"
                                onSubmit={(value) => {
                                    context?.onUpdateUsername(value)
                                }}
                            />
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {context?.user.email}
                            <button
                                onClick={() => {
                                    context?.toggleUpdateEmailModal()
                                }}
                                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                            >
                                <PencilSquareIcon className="w-4 h-4 inline-block fill-orange-600 hover:fill-orange-500" />
                            </button>
                            <SingleInputModalString
                                defaultValue={context?.user.email}
                                isOpen={context?.isUpdateEmailModalOpen}
                                onClose={() => {
                                    context?.toggleUpdateEmailModal()
                                }}
                                label="Update Email"
                                onSubmit={(value) => {
                                    context?.onUpdateEmail(value)
                                }}
                            />
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Mobile Number
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {context?.user.mobileNumber}
                            <button
                                onClick={() => {
                                    context?.toggleUpdateMobileNumberModal()
                                }}
                                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                            >
                                <PencilSquareIcon className="w-4 h-4 inline-block fill-orange-600 hover:fill-orange-500" />
                            </button>
                            <SingleInputModalString
                                defaultValue={context?.user.mobileNumber}
                                isOpen={context?.isUpdateMobileNumberModalOpen}
                                onClose={() => {
                                    context?.toggleUpdateMobileNumberModal()
                                }}
                                label="Update Mobile Number"
                                onSubmit={(value) => {
                                    context?.onUpdateMobileNumber(value)
                                }}
                            />
                        </dd>
                    </div>
                    <div className="col-span-2 bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Location Information
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
                            <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                                    !context?.user
                                                        .locationHidden,
                                                'text-gray-700 ring-1 ring-inset ring-gray-600/20 bg-gray-50':
                                                    context?.user
                                                        .locationHidden,
                                            })}
                                        >
                                            {context?.user.locationHidden
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
                                                    context?.user
                                                        .locationBroadcastMode ===
                                                    'REALTIME',
                                                'text-gray-700 ring-1 ring-inset ring-gray-600/20 bg-gray-50':
                                                    context?.user
                                                        .locationBroadcastMode ===
                                                        'STATIC' ||
                                                    context?.user
                                                        .locationBroadcastMode ===
                                                        'MANUAL',
                                            })}
                                        >
                                            {
                                                context?.user
                                                    .locationBroadcastMode
                                            }
                                        </span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-500">
                                        Latitude
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-900 sm:mt-0">
                                        {context?.user.latitude || 'N/A'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-500">
                                        Longitude
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-900 sm:mt-0">
                                        {context?.user.longitude || 'N/A'}
                                    </dd>
                                </div>
                            </dl>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <Link
                                to={routes.adminImages({
                                    id: context?.user.id,
                                    tab: 'images',
                                })}
                                className="hover:text-gray-500"
                            >
                                <span>
                                    Featured Images
                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 text-gray-500" />
                                </span>
                            </Link>
                        </dt>
                        <dd className="col-span-2 sm:grid sm:grid-cols-2 sm:gap-8">
                            {context?.user.featuredImages.map((images) => (
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
                            {context?.user.Markers.length === 0 && (
                                <div className="">
                                    <span className="text-gray-500 text-sm">
                                        No featured Images
                                    </span>
                                </div>
                            )}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900 hover:text-gray-500">
                            <Link
                                to={routes.adminMarkers({
                                    id: context?.user.id,
                                    tab: 'markers',
                                })}
                                className="hover:text-gray-500"
                            >
                                <span>
                                    Markers
                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 text-gray-500" />
                                </span>
                            </Link>
                        </dt>
                        <dd className="sm:col-span-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {context?.user.Markers.map((images) => (
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
                            {context?.user.Markers.length === 0 && (
                                <div className="">
                                    <span className="text-gray-500 text-sm">
                                        No Markers
                                    </span>
                                </div>
                            )}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Actions
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    context?.onVerifyUser()
                                }}
                            >
                                Verify
                            </Button>
                        </dd>
                    </div>
                </dl>
                <section className="p-4 border border-dashed border-red-700 rounded-lg mt-16">
                    <h2 className="mb-4 font-semibold text-red-700">
                        Danger Zone
                    </h2>
                    <Button
                        variant="danger"
                        onClick={() => {
                            context?.toggleDeleteUserModal()
                        }}
                    >
                        Delete User
                    </Button>
                    <ConfirmationModal
                        isOpen={context?.isDeleteUserModalOpen}
                        onClose={() => context?.toggleDeleteUserModal()}
                        onConfirm={() => context?.onDeleteUser()}
                        title="Delete User"
                        description="Are you sure you want to delete this user? This action cannot be undone."
                        confirmationButtonTitle="Delete"
                    />
                </section>
            </div>
        </div>
    )
}

export default User
