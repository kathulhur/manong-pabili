import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import UsersCell from 'src/components/Admin/User/UsersCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'
import { PaginationContextProvider } from 'src/pages/Admin/User/UsersPage/Context'
const UsersPage = ({ page = 1, pageSize = 10 }) => {
    return (
        <PaginationContextProvider page={page} pageSize={pageSize}>
            <FadeTransitionLayout>
                <div>
                    <MetaTags title="Users" description="Users page" />
                    <UsersCell />
                </div>
            </FadeTransitionLayout>
        </PaginationContextProvider>
    )
}

export default UsersPage
