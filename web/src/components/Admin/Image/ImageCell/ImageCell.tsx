import type { ImageCellQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Image from 'src/components/Admin/Image/Image'
import { routes } from '@redwoodjs/router'
import Breadcrumb, {
    BreadcrumbProps,
} from 'src/components/Breadcrumb/Breadcrumb'
import { ImageCellContextProvider } from './Context'

export const QUERY = gql`
    query ImageCellQuery($id: Int!) {
        image: image(id: $id) {
            id
            title
            url
            userId
            createdAt
            updatedAt
            deletedAt
            deleted
            user {
                id
                username
            }
        }
    }
`
export const DELETE_IMAGE_MUTATION = gql`
    mutation DeleteAdminImageMutation($id: Int!) {
        softDeleteImage(id: $id) {
            id
        }
    }
`

export const Loading = () => null

export const Empty = () => <div>Image not found</div>

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ image }: CellSuccessProps<ImageCellQuery>) => {
    let pages: BreadcrumbProps['pages'] = [
        {
            name: 'Users',
            to: routes.adminUsers(),
        },
        {
            name: image.user.username,
            to: routes.adminUser({ id: image.user.id }),
        },
        {
            name: 'Images',
            to: routes.adminImages(),
        },
        {
            name: image.title,
            to: routes.adminImage({ id: image.id }),
            current: true,
        },
    ]
    return (
        <ImageCellContextProvider image={image}>
            <div className="space-y-8">
                <Breadcrumb pages={pages} />
                <Image />
            </div>
        </ImageCellContextProvider>
    )
}
