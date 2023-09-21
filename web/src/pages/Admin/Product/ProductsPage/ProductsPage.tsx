import { routes } from '@redwoodjs/router'
import ProductsCell from 'src/components/Admin/Product/ProductsCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'
import { PaginationContextProvider } from '../../User/UsersPage/Context'
import { ProductsPageContextProvider } from './Context'
import Breadcrumb from 'src/components/Breadcrumb/Breadcrumb'

export interface ProductsPageProps {
    page: number
    userId: number
}

const ProductsPage = ({ page = 1, pageSize = 10, userId = null }) => {
    return (
        <ProductsPageContextProvider userId={userId}>
            <PaginationContextProvider page={page} pageSize={pageSize}>
                <FadeTransitionLayout>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <ProductsCell />
                    </div>
                </FadeTransitionLayout>
            </PaginationContextProvider>
        </ProductsPageContextProvider>
    )
}

export default ProductsPage
