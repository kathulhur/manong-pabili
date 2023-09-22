import { MetaTags } from '@redwoodjs/web'
import MarkerCell from 'src/components/Admin/Marker/MarkerCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'

type MarkerPageProps = {
    id: number
}

const MarkerPage = ({ id }: MarkerPageProps) => {
    return (
        <FadeTransitionLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <MetaTags title="Marker" description="Marker page" />
                <MarkerCell id={id} />
            </div>
        </FadeTransitionLayout>
    )
}

export default MarkerPage
