import { BellIcon } from '@heroicons/react/20/solid'
import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import useLogout from 'src/hooks/useLogout'
import {
    TriggerMorningNotificationMutation,
    TriggerMorningNotificationMutationVariables,
} from 'types/graphql'
export const TRIGGER_MORNING_NOTIFICATION_MUTATION = gql`
    mutation TriggerMorningNotificationMutation {
        triggerMorningNotification
    }
`

const AdminPage = () => {
    const { isAuthenticated, loading } = useAuth()
    const logOut = useLogout()

    if (loading) {
        return 'loading...'
    }

    if (!isAuthenticated) {
        navigate(routes.login())
        return null
    }

    const [
        triggerMorningNotificationMutation,
        { loading: triggerMorningNotificationMutationLoading, error },
    ] = useMutation<
        TriggerMorningNotificationMutation,
        TriggerMorningNotificationMutationVariables
    >(TRIGGER_MORNING_NOTIFICATION_MUTATION)

    return (
        <>
            <MetaTags title="Admin" description="Admin page" />
            <div className="mt-16 px-8">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-green-500">
                        AdminPage
                    </h1>
                    <Button
                        onClick={async () =>
                            await triggerMorningNotificationMutation()
                        }
                    >
                        <BellIcon className="h-5 w-5" />
                    </Button>
                </div>
                <ul className="space-y-4 text-lg font-semibold mt-8">
                    <li className="">
                        <Link to={routes.adminUsers()}>Users &gt;</Link>
                    </li>
                    <li>
                        <Link to={routes.adminProducts()}>Products &gt;</Link>
                    </li>
                    <li>
                        <Link to={routes.adminImages()}>Images &gt;</Link>
                    </li>
                    <li>
                        <Link to={routes.adminMarkers()}>Markers &gt;</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminPage
