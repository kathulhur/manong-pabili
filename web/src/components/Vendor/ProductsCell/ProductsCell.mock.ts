import { ProductsQuery } from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */): {
    products: ProductsQuery['productsByUser']
} => ({
    products: [
        {
            __typename: 'Product',
            id: 1,
            name: 'Product A',
            availability: true,
        },
        {
            __typename: 'Product',
            id: 2,
            name: 'Product B',
            availability: false,
        },
        {
            __typename: 'Product',
            id: 3,
            name: 'Product C',
            availability: true,
        },
        {
            __typename: 'Product',
            id: 4,
            name: 'Product D',
            availability: false,
        },
    ],
})
