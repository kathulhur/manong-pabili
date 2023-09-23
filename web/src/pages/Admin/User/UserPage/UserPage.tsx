import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import UserCell from 'src/components/Admin/User/UserCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'

type UserPageProps = {
    id: number
}

const UserPage = ({ id }: UserPageProps) => {
    return (
        <FadeTransitionLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <MetaTags title="User" description="User page" />
                <UserCell id={id} />
            </div>
        </FadeTransitionLayout>
    )
}

export default UserPage
