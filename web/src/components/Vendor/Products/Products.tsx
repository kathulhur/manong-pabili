import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useState } from 'react'
import { CREATE_PRODUCT_MUTATION } from 'src/components/Admin/Product/NewProduct'
import Button from 'src/components/Button/Button'
import CreateProductModal from 'src/components/Modals/CreateProductModal'
import Product from 'src/components/Vendor/Product'
import {
    CreateProductInput,
    CreateProductMutation,
    CreateProductMutationVariables,
    Product as ProductType,
} from 'types/graphql'

export interface ProductsProps {
    products: Pick<ProductType, 'id' | 'name' | 'availability'>[]
}

const Products = ({ products }: ProductsProps) => {
    const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
        useState(false)

    const [createProduct] = useMutation<
        CreateProductMutation,
        CreateProductMutationVariables
    >(CREATE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error creating product')
        },
        onCompleted: () => {
            toast.success('Product created')
            setIsCreateProductModalOpen(false)
        },
        update: (cache, { data }) => {
            const newProduct = data?.createProduct
            if (newProduct) {
                cache.modify({
                    fields: {
                        productsByUser: (
                            existingProductsRefs = [],
                            { readField }
                        ) => {
                            const newProductRef = cache.writeFragment({
                                id: newProduct.__typename + ':' + newProduct.id,
                                data: newProduct,
                                fragment: gql`
                                    fragment NewProduct on Product {
                                        id
                                        name
                                        availability
                                    }
                                `,
                            })
                            return [newProductRef, ...existingProductsRefs]
                        },
                    },
                })
            }
        },
    })

    const onCreateProductModalSubmit = async (input: CreateProductInput) => {
        try {
            await createProduct({
                variables: {
                    input,
                },
            })
        } catch (error) {}
    }
    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-lg font-bold">Products</h1>
                <div>
                    <Button
                        className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() =>
                            setIsCreateProductModalOpen(
                                !isCreateProductModalOpen
                            )
                        }
                    >
                        Add Product
                    </Button>
                    <CreateProductModal
                        isOpen={isCreateProductModalOpen}
                        onClose={() => setIsCreateProductModalOpen(false)}
                        onSubmit={onCreateProductModalSubmit}
                    />
                </div>
            </div>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="my-4">
                        <Product product={product} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Products
