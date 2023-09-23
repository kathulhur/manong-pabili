import {
    AcademicCapIcon,
    BanknotesIcon,
    BellIcon,
    CakeIcon,
    CheckBadgeIcon,
    ClockIcon,
    MapPinIcon,
    PhotoIcon,
    ReceiptRefundIcon,
    UsersIcon,
} from '@heroicons/react/20/solid'
import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import clsx from 'clsx'
import { useEffect } from 'react'
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
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate(routes.login())
        }
    }, [loading, isAuthenticated])

    const [
        triggerMorningNotificationMutation,
        { loading: triggerMorningNotificationMutationLoading, error },
    ] = useMutation<
        TriggerMorningNotificationMutation,
        TriggerMorningNotificationMutationVariables
    >(TRIGGER_MORNING_NOTIFICATION_MUTATION)

    const links = [
        {
            title: 'Users',
            to: routes.adminUsers({
                tab: 'users',
            }),
            icon: UsersIcon,
            iconForeground: 'text-teal-700',
            iconBackground: 'bg-teal-50',
            content: 'Manage users',
        },
        {
            title: 'Products',
            to: routes.adminProducts({
                tab: 'products',
            }),
            icon: CakeIcon,
            iconForeground: 'text-purple-700',
            iconBackground: 'bg-purple-50',
            content: 'Manage products',
        },
        {
            title: 'Images',
            to: routes.adminImages({
                tab: 'images',
            }),
            icon: PhotoIcon,
            iconForeground: 'text-sky-700',
            iconBackground: 'bg-sky-50',
            content: 'Manage images',
        },
        {
            title: 'Markers',
            to: routes.adminMarkers({
                tab: 'markers',
            }),
            icon: MapPinIcon,
            iconForeground: 'text-yellow-700',
            iconBackground: 'bg-yellow-50',
            content: 'Manage markers',
        },
    ]

    return (
        <>
            <MetaTags title="Admin" description="Admin page" />
            <div className="px-4 sm:px-6 lg:px-8 space-y-8">
                <h1 className='className="text-base font-semibold leading-6 text-gray-900"'>
                    Dashboard
                </h1>
                {!loading && isAuthenticated && (
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                        {links.map((action, actionIdx) => (
                            <div
                                key={action.title}
                                className={clsx(
                                    actionIdx === 0
                                        ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                                        : '',
                                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                    actionIdx === links.length - 2
                                        ? 'sm:rounded-bl-lg'
                                        : '',
                                    actionIdx === links.length - 1
                                        ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                                        : '',
                                    'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                )}
                            >
                                <div>
                                    <span
                                        className={clsx(
                                            action.iconBackground,
                                            action.iconForeground,
                                            'inline-flex rounded-lg p-3 ring-4 ring-white'
                                        )}
                                    >
                                        <action.icon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                                        <Link
                                            to={action.to}
                                            className="focus:outline-none"
                                        >
                                            {/* Extend touch target to entire panel */}
                                            <span
                                                className="absolute inset-0"
                                                aria-hidden="true"
                                            />
                                            {action.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {action.content}
                                    </p>
                                </div>
                                <span
                                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminPage
