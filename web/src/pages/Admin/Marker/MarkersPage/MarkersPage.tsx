import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import MarkersCell from 'src/components/Admin/Marker/MarkersCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'
import { PaginationContextProvider } from '../../User/UsersPage/Context'
import { MarkersPageContextProvider } from './Context'

const MarkersPage = ({ page = 1, pageSize = 10, userId = null }) => {
    return (
        <MarkersPageContextProvider userId={userId}>
            <PaginationContextProvider page={page} pageSize={pageSize}>
                <FadeTransitionLayout>
                    <div>
                        <MetaTags title="Markers" description="Markers page" />

                        <MarkersCell />
                    </div>
                </FadeTransitionLayout>
            </PaginationContextProvider>
        </MarkersPageContextProvider>
    )
}

export default MarkersPage
