import { XMarkIcon } from '@heroicons/react/20/solid'
import Button from 'src/components/Button'
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
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <p>{image.title}</p>
                <Button
                    variant="danger"
                    className="border p-2 rounded-md"
                    onClick={() => deleteImageHandler(image.id)}
                    disabled={imageDeleteLoading}
                >
                    <XMarkIcon className="w-4 h-4" />
                </Button>
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
