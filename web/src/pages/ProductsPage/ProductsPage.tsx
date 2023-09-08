import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import ProductsCell from 'src/components/ProductsCell'

const ProductsPage = () => {
    const { currentUser } = useAuth()

    return (
        <>
            <MetaTags title="Products" description="Products page" />
            <div
                className='max-w-7xl mx-auto p-8'
            >
                <Link to={routes.home()}>
                    <Button
                        variant='subtle'
                        icon={<ChevronLeftIcon />}
                    >Go back</Button>
                </Link>
                <ProductsCell userId={currentUser?.id} />

            </div>
        </>
    )
}

export default ProductsPage
