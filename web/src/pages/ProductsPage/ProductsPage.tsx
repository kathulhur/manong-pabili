import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ProductsCell from 'src/components/ProductsCell'

const ProductsPage = () => {
    const { isAuthenticated, currentUser, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        routes.login()
        return null
    }
    return (
        <>
            <MetaTags title="Products" description="Products page" />
            <Link to={routes.home()}>&lt; Go back</Link>
            <h1>Lahat ng iyong produkto</h1>
            <ProductsCell userId={currentUser.id} />
        </>
    )
}

export default ProductsPage
