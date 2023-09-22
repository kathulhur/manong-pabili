import { MetaTags } from '@redwoodjs/web'
import ProductCell from 'src/components/Admin/Product/ProductCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'

type ProductPageProps = {
    id: number
}

const ProductPage = ({ id }: ProductPageProps) => {
    return (
        <FadeTransitionLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <MetaTags title="Product" description="Product page" />
                <ProductCell id={id} />
            </div>
        </FadeTransitionLayout>
    )
}

export default ProductPage
