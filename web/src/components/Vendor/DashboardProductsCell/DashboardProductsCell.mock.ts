// Define your own mock data here:

import { DashboardProductsQuery } from 'types/graphql'

export const standard = (/* vars, { ctx, req } */): {
    dashboardProducts: DashboardProductsQuery['dashboardProducts']
} => ({
    dashboardProducts: [
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
