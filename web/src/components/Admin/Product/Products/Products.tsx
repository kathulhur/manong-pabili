import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Product/ProductsCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'
import { DELETE_PRODUCT_MUTATION } from '../Product'

import type {
    DeleteProductMutationVariables,
    FindProducts,
} from 'types/graphql'
import Table, { TableProps } from './Table/Table'
import Pagination from 'src/components/Pagination/Pagination'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'
import { useContext } from 'react'
import { ProductsPageContext } from 'src/pages/Admin/Product/ProductsPage/Context'

export interface ProductsListProps {
    products: TableProps['products']
    count: number
}

const ProductsList = ({ products, count }: ProductsListProps) => {
    const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
        onCompleted: () => {
            toast.success('Product deleted')
        },
        onError: (error) => {
            toast.error(error.message)
        },
        update: (cache, { data: { softDeleteProduct } }) => {
            const deletedProductId = softDeleteProduct?.id
            if (deletedProductId) {
                cache.modify({
                    fields: {
                        productPage: (
                            existingProductPage: FindProducts['productPage'],
                            { readField }
                        ): FindProducts['productPage'] => {
                            return {
                                ...existingProductPage,
                                products: existingProductPage.products.filter(
                                    (product) =>
                                        deletedProductId !==
                                        readField('id', product)
                                ),
                                count: existingProductPage.count - 1,
                            }
                        },
                    },
                })
            }
        },
    })

    const onDelete = (id: DeleteProductMutationVariables['id']) => {
        if (confirm('Are you sure you want to delete product ' + id + '?')) {
            deleteProduct({ variables: { id } })
        }
    }
    const { pageSize } = useContext(PaginationContext)
    const productsPageContext = useContext(ProductsPageContext)
    return (
        <div className="space-y-4">
            <Pagination
                count={count}
                paginate={(page) => {
                    if (productsPageContext?.userId) {
                        return routes.adminProducts({
                            page,
                            pageSize,
                            userId: productsPageContext?.userId || undefined,
                        })
                    }
                    return routes.adminProducts({ page, pageSize })
                }}
            />
            <Table products={products} onDelete={onDelete} />
        </div>
    )
}

export default ProductsList
