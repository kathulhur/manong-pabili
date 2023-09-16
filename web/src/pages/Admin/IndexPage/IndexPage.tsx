import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import useLogout from 'src/hooks/useLogout'

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

    return (
        <>
            <MetaTags title="Admin" description="Admin page" />
            <div className="mt-16 px-8">
                <h1 className="text-2xl font-bold text-green-500">AdminPage</h1>
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
