import { XMarkIcon } from '@heroicons/react/20/solid'
import Button from 'src/components/Button'
import ConfirmationModal from 'src/components/Modals/ConfirmationModal'
import { Image as ImageType } from 'types/graphql'

export interface FeaturedImageProps {
    image: Pick<ImageType, 'id' | 'title' | 'url'>
    imageDeleteLoading: boolean
    deleteImageHandler: (id: number) => void
}

const FeaturedImage = ({
    image,
    imageDeleteLoading,
    deleteImageHandler,
}: FeaturedImageProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <p>{image.title}</p>
                <Button
                    variant="danger"
                    className="border p-2 rounded-md"
                    onClick={() => setIsDeleteModalOpen(true)}
                    disabled={imageDeleteLoading}
                >
                    <XMarkIcon className="w-4 h-4" />
                </Button>
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    title="Delete Image"
                    description="Are you sure you want to delete this image?"
                    confirmationButtonTitle="Delete"
                    onConfirm={() => deleteImageHandler(image.id)}
                    onClose={() => {
                        setIsDeleteModalOpen(false)
                    }}
                />
            </div>
            <img
                src={image.url}
                alt={image.title}
                className="object-scale-down p-8"
            />
        </div>
    )
}

export default FeaturedImage
