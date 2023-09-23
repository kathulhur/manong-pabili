import { navigate, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

import ProductForm from 'src/components/Admin/Product/ProductForm'

import {
    CreateProductMutation,
    type CreateProductInput,
    CreateProductMutationVariables,
} from 'types/graphql'

export const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProductMutation($input: CreateProductInput!) {
        createProduct(input: $input) {
            id
            name
            availability
        }
    }
`

const NewProduct = () => {
    const params = useParams()
    const userId = params?.userId

    const [createProduct, { loading, error }] = useMutation<
        CreateProductMutation,
        CreateProductMutationVariables
    >(CREATE_PRODUCT_MUTATION, {
        onCompleted: () => {
            toast.success('Product created')
            navigate(
                routes.adminProducts({
                    userId: userId,
                })
            )
        },
        onError: (error) => {
            error.graphQLErrors.map(({ message }) => toast.error(message))
        },
    })

    const onCreateProduct = ({ name }) => {
        createProduct({
            variables: {
                input: {
                    name,
                    availability: false,
                    userId: typeof userId === 'string' ? parseInt(userId) : 0,
                },
            },
        })
    }

    useEffect(() => {
        if (!userId) {
            navigate(routes.adminProducts())
        }
    }, [userId])
    return (
        userId && (
            <ProductForm
                onSave={onCreateProduct}
                loading={loading}
                error={error}
                userId={undefined}
            />
        )
    )
}

export default NewProduct
