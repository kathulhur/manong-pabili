import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import Container from 'src/components/Vendor/Container/Container'
import GoBack from 'src/components/GoBack/GoBack'
import ProductsCell from 'src/components/Vendor/ProductsCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'

const ProductsPage = () => {
    const { currentUser } = useAuth()

    return (
        <FadeTransitionLayout>
            <div>
                <MetaTags title="Products" description="Products page" />
                <Container>
                    <GoBack className="mb-4" />
                    <ProductsCell userId={currentUser?.id} />
                </Container>
            </div>
        </FadeTransitionLayout>
    )
}

export default ProductsPage
