import { useMutation } from '@redwoodjs/web'
import { DashboardProductsQuery, Product } from 'types/graphql'
import { QUERY } from 'src/components/Vendor/DashboardProductsCell/DashboardProductsCell'
import { useAuth } from 'src/auth'
import Button from '../../Button/Button'
import { toast } from '@redwoodjs/web/toast'

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UpdateDashboardProductAvailabilityMutation(
        $id: Int!
        $input: UpdateProductInput!
    ) {
        updateProduct(id: $id, input: $input) {
            id
            availability
        }
    }
`

const DashboardProduct = ({
    product,
}: {
    product: Pick<Product, 'id' | 'name' | 'availability'>
}) => {
    const { currentUser } = useAuth()
    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onError: (error) => {
            toast.error('Error updating product availability')
        },
        onCompleted: () => {
            toast.success('Product availability updated')
        },
    })

    const updateProductAvailability = (id: number, availability: boolean) => {
        updateProduct({
            variables: {
                id,
                input: {
                    availability: !availability,
                },
            },
        })
    }

    const productAvailabilityButtonHandler = () => {
        try {
            updateProductAvailability(product.id, product.availability)
        } catch (error) {
            alert('Error updating product availability')
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                    {product.name}
                </span>
                <Button
                    variant="subtle"
                    type="button"
                    onClick={productAvailabilityButtonHandler}
                >
                    {product.availability ? 'Available' : 'Unavailable'}
                </Button>
            </div>
        </div>
    )
}

export default DashboardProduct
