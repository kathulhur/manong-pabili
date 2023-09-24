import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import GoBack from 'src/components/GoBack/GoBack'
import ProductsCell from 'src/components/Vendor/ProductsCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'

const ProductsPage = () => {
    const { currentUser } = useAuth()

    return (
        <FadeTransitionLayout>
            <div>
                <MetaTags title="Products" description="Products page" />
                <div className="max-w-2xl mx-auto p-8">
                    <div className="mb-4">
                        <GoBack />
                    </div>
                    <ProductsCell userId={currentUser?.id} />
                </div>
            </div>
        </FadeTransitionLayout>
    )
}

export default ProductsPage
