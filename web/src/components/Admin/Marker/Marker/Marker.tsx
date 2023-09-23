import Button from 'src/components/Button'
import ConfirmationModal from 'src/components/Modals/ConfirmationModal'

import { formatDatetime } from 'src/lib/formatters'

import type { MarkerCellQuery } from 'types/graphql'
import { MarkerCellContext } from '../MarkerCell/Context'
import { useContext } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'

export interface MarkerProps {
    marker: NonNullable<MarkerCellQuery['marker']>
}

const Marker = () => {
    const context = useContext(MarkerCellContext)
    return (
        <div className="overflow-auto">
            <div className="px-4 sm:px-0 my-8">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Marker
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Marker details
                </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100 sm:grid sm:grid-cols-2">
                    <div className="bg-white px-4 py-6 sm:col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            URL
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 hover:text-gray-500">
                            <a href={context?.marker.url}>
                                <span>
                                    {context?.marker.url}
                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 -mt-1" />
                                </span>
                            </a>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Marker
                        </dt>
                        <dd className="sm:col-span-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            <a
                                href={context?.marker.url}
                                target="_blank"
                                className="hover:opacity-75 inline-block w-16"
                            >
                                <div className=" aspect-h-1 aspect-w-1 w-full ring-1 ring-gray-600 ring-inset overflow-hidden rounded-full bg-gray-200 lg:aspect-none group-hover:opacity-75">
                                    <img
                                        src={context?.marker.url}
                                        alt={'marker'}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                            </a>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Owner
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 hover:text-gray-500">
                            <Link
                                to={routes.adminUser({
                                    id: context?.marker.user.id,
                                    tab: 'users',
                                })}
                            >
                                <span>
                                    {context?.marker.user.username}
                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 -mt-1" />
                                </span>
                            </Link>
                        </dd>
                    </div>
                    <div className="px-4 py-6 col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
                                            context?.marker.createdAt
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Updated At
                                    </dt>
                                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {formatDatetime(
                                            context?.marker.updatedAt
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Deleted At
                                    </dt>
                                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {formatDatetime(
                                            context?.marker.deletedAt
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
                        onClick={() =>
                            context?.setIsDeleteMarkerModalOpen(true)
                        }
                    >
                        Delete Marker
                    </Button>
                    <ConfirmationModal
                        isOpen={context?.isDeleteMarkerModalOpen}
                        onClose={() => {
                            context?.setIsDeleteMarkerModalOpen(false)
                        }}
                        onConfirm={context?.onDeleteMarker}
                        title="Delete Marker"
                        description="Are you sure you want to delete this marker? This action cannot be undone."
                        confirmationButtonTitle="Delete"
                    />
                </section>
            </div>
        </div>
    )
}

export default Marker
