import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ImagesCell from 'src/components/Admin/Image/ImagesCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'
import { PaginationContextProvider } from '../../User/UsersPage/Context'
import { ImagesPageContextProvider } from './Context'

const ImagesPage = ({ page = 1, pageSize = 10, userId = null }) => {
    return (
        <ImagesPageContextProvider userId={userId}>
            <PaginationContextProvider page={page} pageSize={pageSize}>
                <FadeTransitionLayout>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <MetaTags title="Images" description="Images page" />
                        <ImagesCell />
                    </div>
                </FadeTransitionLayout>
            </PaginationContextProvider>
        </ImagesPageContextProvider>
    )
}

export default ImagesPage
