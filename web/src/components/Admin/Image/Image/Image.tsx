import { ArrowUpRightIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react'
import Button from 'src/components/Button'
import ConfirmationModal from 'src/components/Modals/ConfirmationModal'
import { formatDatetime } from 'src/lib/formatters'
import type { Image as ImageType } from 'types/graphql'
import { ImageCellContext } from '../ImageCell/Context'
import { Link, routes } from '@redwoodjs/router'
import SingleInputModalString from 'src/components/Modals/SingleInputModalString'

interface Props {
    image: Pick<
        ImageType,
        | 'id'
        | 'title'
        | 'url'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'deleted'
    > & {
        user: Pick<ImageType['user'], 'id' | 'username'>
    }
}

const Image = () => {
    const context = useContext(ImageCellContext)

    return (
        <div>
            <div className="px-4 sm:px-0 my-8">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Image
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Image details
                </p>
            </div>

            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100 sm:grid sm:grid-cols-2">
                    <div className="bg-white px-4 py-6 sm:col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Title
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {context?.image.title}
                            <button
                                onClick={() => {
                                    context?.toggleUpdateTitleModal()
                                }}
                                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                            >
                                <PencilSquareIcon className="w-4 h-4 inline-block fill-orange-600 hover:fill-orange-500" />
                            </button>
                            <SingleInputModalString
                                defaultValue={context?.image.title}
                                isOpen={context?.isUpdateTitleModalOpen}
                                onClose={() => {
                                    context?.toggleUpdateTitleModal()
                                }}
                                label="Update Mobile Number"
                                onSubmit={(value) => {
                                    context?.onUpdateTitle(value)
                                }}
                            />
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            URL
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 hover:text-gray-500">
                            <a href={context?.image.url}>
                                <span>
                                    {context?.image.url}
                                    <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1 -mt-1" />
                                </span>
                            </a>
                        </dd>
                    </div>

                    <div className="bg-white px-4 py-6 col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Image
                        </dt>
                        <dd className="col-span-2 sm:grid sm:grid-cols-2 sm:gap-8">
                            <div
                                key={context?.image.id}
                                className="col-span-2 group relative max-w-sm"
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <a
                                        href={context?.image.url}
                                        target="_blank"
                                    >
                                        <img
                                            src={context?.image.url}
                                            alt={context?.image.title}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </a>
                                </div>
                                <div className="mt-2 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700"></h3>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:col-span-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Owner
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 hover:text-gray-500">
                            <Link
                                to={routes.adminUser({
                                    id: context?.image.user.id,
                                    tab: 'users',
                                })}
                            >
                                <span>
                                    {context?.image.user.username}
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
                                            context?.image.createdAt
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Updated At
                                    </dt>
                                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {formatDatetime(
                                            context?.image.updatedAt
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Deleted At
                                    </dt>
                                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {formatDatetime(
                                            context?.image.deletedAt
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
                        onClick={() => context?.setIsDeleteImageModalOpen(true)}
                    >
                        Delete Marker
                    </Button>
                    <ConfirmationModal
                        isOpen={context?.isDeleteImageModalOpen}
                        onClose={() => {
                            context?.setIsDeleteImageModalOpen(false)
                        }}
                        onConfirm={context?.onDeleteImage}
                        title="Delete Marker"
                        description="Are you sure you want to delete this marker? This action cannot be undone."
                        confirmationButtonTitle="Delete"
                    />
                </section>
            </div>
        </div>
    )
}

export default Image
