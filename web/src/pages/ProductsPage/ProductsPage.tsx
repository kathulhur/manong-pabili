import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ProductsCell from 'src/components/ProductsCell'

const ProductsPage = () => {
    const { currentUser } = useAuth()

    return (
        <>
            <MetaTags title="Products" description="Products page" />
            <div
                className='max-w-7xl mx-auto p-8'
            >
                <Link to={routes.home()}>&lt; Go back</Link>
                <ProductsCell userId={currentUser?.id} />

            </div>
        </>
    )
}

export default ProductsPage
