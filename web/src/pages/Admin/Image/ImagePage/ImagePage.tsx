import { MetaTags } from '@redwoodjs/web'
import ImageCell from 'src/components/Admin/Image/ImageCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'

type ImagePageProps = {
    id: number
}

const ImagePage = ({ id }: ImagePageProps) => {
    return (
        <FadeTransitionLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <MetaTags title="Image" description="Image page" />
                <ImageCell id={id} />
            </div>
        </FadeTransitionLayout>
    )
}

export default ImagePage
