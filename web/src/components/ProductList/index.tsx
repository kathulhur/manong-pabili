import { useState } from 'react'

import { Product } from 'types/graphql'

import SingleProduct from '../SingleProduct'

const ProductList = ({
    productList,
}: {
    productList: Omit<Product, 'user' | 'userId'>[]
}) => {
    const [products, setProducts] = useState(productList)
    const onDelete = (id: number) => {
        setProducts(products.filter((product) => product.id !== id))
    }
    return (
        <ul>
            {products.map((product) => (
                <SingleProduct
                    onDelete={onDelete}
                    key={product.id}
                    product={product}
                />
            ))}
        </ul>
    )
}

export default ProductList
