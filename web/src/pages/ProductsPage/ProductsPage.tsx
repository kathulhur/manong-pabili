import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import ProductsCell from 'src/components/ProductsCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'

const ProductsPage = () => {
    const { currentUser } = useAuth()

    return (
        <FadeTransitionLayout>
        <div>
            <MetaTags title="Products" description="Products page" />
            <div
                className='max-w-7xl mx-auto p-8'
<<<<<<< Updated upstream
            >
                <Link to={routes.home()}>
                    <Button
                        variant='subtle'
                        icon={<ChevronLeftIcon />}
                    >Go back</Button>
                </Link>
=======
                >
                <Link to={routes.home()}>&lt; Go back</Link>
>>>>>>> Stashed changes
                <ProductsCell userId={currentUser?.id} />

            </div>
        </div>
    </FadeTransitionLayout>
    )
}

export default ProductsPage
