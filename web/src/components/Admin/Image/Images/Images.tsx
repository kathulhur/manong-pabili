import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Image/ImagesCell'
import { truncate } from 'src/lib/formatters'
import { DELETE_IMAGE_MUTATION } from 'src/components/Admin/Image/Image'
import type { DeleteImageMutationVariables, FindImages } from 'types/graphql'
import Pagination from 'src/components/Pagination/Pagination'
import Table, { TableProps } from './Table/Table'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import { useContext } from 'react'

export interface ImagesListProps {
    images: TableProps['images']
    count: number
}

const ImagesList = ({ images, count }: ImagesListProps) => {
    const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
        onCompleted: () => {
            toast.success('Image deleted')
        },
        onError: (error) => {
            toast.error(error.message)
        },
        // This refetches the query on the list page. Read more about other ways to
        // update the cache over here:
        // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
        update: (cache, { data: { softDeleteImage } }) => {
            const deletedImageId = softDeleteImage?.id
            if (deletedImageId) {
                cache.modify({
                    fields: {
                        imagePage: (
                            existingImagePage: FindImages['imagePage'],
                            { readField }
                        ): FindImages['imagePage'] => {
                            return {
                                ...existingImagePage,
                                images: existingImagePage.images.filter(
                                    (image) =>
                                        deletedImageId !==
                                        readField('id', image)
                                ),
                                count: existingImagePage.count - 1,
                            }
                        },
                    },
                })
            }
        },
    })

    const onDeleteClick = (id: DeleteImageMutationVariables['id']) => {
        if (confirm('Are you sure you want to delete image ' + id + '?')) {
            deleteImage({ variables: { id } })
        }
    }
    const { pageSize } = useContext(PaginationContext)
    return (
        <div className="space-y-4">
            <Table images={images} onDelete={onDeleteClick} />
            <Pagination
                count={count}
                paginate={(page) => {
                    routes.adminImages({ page, pageSize })
                }}
            />
        </div>
    )
}

export default ImagesList
