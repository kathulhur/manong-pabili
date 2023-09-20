import { routes } from '@redwoodjs/router'
import ProductsCell from 'src/components/Admin/Product/ProductsCell'
import FadeTransitionLayout from 'src/layouts/FadeTransitionLayout/FadeTransitionLayout'
import { PaginationContextProvider } from '../../User/UsersPage/Context'
import { ProductsPageContextProvider } from './Context'

export interface ProductsPageProps {
    page: number
    userId: number
}

const ProductsPage = ({ page = 1, pageSize = 10, userId = null }) => {
    return (
        <ProductsPageContextProvider userId={userId}>
            <PaginationContextProvider page={page} pageSize={pageSize}>
                <FadeTransitionLayout>
                    <div>
                        <ProductsCell />
                    </div>
                </FadeTransitionLayout>
            </PaginationContextProvider>
        </ProductsPageContextProvider>
    )
}

export default ProductsPage
