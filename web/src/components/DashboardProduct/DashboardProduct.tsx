import { useMutation } from "@redwoodjs/web";
import { DashboardProductsQuery } from "types/graphql";
import { QUERY } from "../DashboardProductsCell";
import { useAuth } from "src/auth";

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UpdateProductAvailabilityMutation(
        $id: Int!
        $input: UpdateProductInput!
    ) {
        updateProduct(id: $id, input: $input) {
            id
        }
    }
`

const DashboardProduct = ({
  product,
}: {
  product: DashboardProductsQuery['dashboardProducts'][number]
}) => {
    const { currentUser } = useAuth()
    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onError: (error) => {
            alert('Error updating product availability')
            console.log(error)
        },
        onCompleted: () => {
            alert('Product availability updated')
            console.log('Product updated')
        },
        refetchQueries: [{ query: QUERY, variables: { userId: currentUser?.id } }],
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
            console.log(error)
        }
    }

    return (
        <div className="py-2">
            <div className="flex justify-between items-center">
                <span>{product.name}</span>
                <button
                    className="border py-2 px-4 rounded-md"
                    type="button"
                    onClick={productAvailabilityButtonHandler}
                >
                    {product.availability ? 'Available' : 'Unavailable'}
                </button>
            </div>
        </div>
    )
};

export default DashboardProduct;
