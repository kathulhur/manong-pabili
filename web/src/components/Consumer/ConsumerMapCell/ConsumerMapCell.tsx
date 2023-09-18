import type {
    ConsumerMapCellQuery,
    ConsumerMapCellQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ConsumerMap from '../ConsumerMap/ConsumerMap'

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
        <ConsumerMap vendors={[]} products={[]} className="h-screen w-screen" />
    )
}

export const Failure = ({ error }: CellFailureProps<ConsumerMapCellQuery>) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
    mapVendors,
}: CellSuccessProps<ConsumerMapCellQuery, ConsumerMapCellQueryVariables>) => {
    const vendorProducts = mapVendors.flatMap((vendor) =>
        vendor.productsOffered.map((product) => ({
            ...product,
            vendorId: vendor.id,
        }))
    )
    return (
        <ConsumerMap
            vendors={mapVendors}
            products={vendorProducts}
            className="h-screen w-screen"
        />
    )
}
