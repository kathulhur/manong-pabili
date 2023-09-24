import type {
    ConsumerMapCellQuery,
    ConsumerMapCellQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ConsumerMap from '../ConsumerMap/ConsumerMap'
import {
    ConsumerMapCellContext,
    ConsumerMapCellContextProvider,
} from './Context'

export const QUERY = gql`
    query ConsumerMapCellQuery {
        mapVendors {
            __typename
            id
            name
            latitude
            longitude
            lastLocationUpdate
            locationBroadcastMode
            locationHidden
            markerUrl
            productsOffered {
                id
                name
                availability
                userId
            }
            featuredImages {
                id
                title
                url
                userId
            }
        }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
    return (
        <ConsumerMapCellContextProvider vendors={[]} products={[]}>
            <ConsumerMap className="h-screen w-full" />
        </ConsumerMapCellContextProvider>
    )
}

export const Failure = ({ error }: CellFailureProps<ConsumerMapCellQuery>) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
    mapVendors,
}: CellSuccessProps<ConsumerMapCellQuery, ConsumerMapCellQueryVariables>) => {
    const products = mapVendors.flatMap((vendor) =>
        vendor.productsOffered.map((product) => ({
            ...product,
            vendorId: vendor.id,
        }))
    )
    return (
        <ConsumerMapCellContextProvider
            vendors={mapVendors}
            products={products}
        >
            <ConsumerMap className="h-screen w-full" />
        </ConsumerMapCellContextProvider>
    )
}
