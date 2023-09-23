import { type CellSuccessProps, type CellFailureProps } from '@redwoodjs/web'
import { getCurrentPositionAsync } from 'src/hooks/useCoordinates'
import LoadingComponent from 'src/components/Loading/Loading'
import VendorHomepage from '../VendorHomepage/VendorHomepage'
import type {
    VendorHomepageCellQuery,
    VendorHomepageCellQueryVariables,
} from 'types/graphql'
import { VendorHomepageContextProvider } from './Context'
export const beforeQuery = ({ userId }) => {
    return {
        variables: { id: userId },
    }
}
export const QUERY = gql`
    query VendorHomepageCellQuery($id: Int!) {
        vendor(id: $id) {
            id
            name
            username
            email
            latitude
            longitude
            locationBroadcastMode
            productsOffered {
                id
                name
            }
            roles
            markerUrl
            locationHidden
            featuredImages {
                id
                url
                title
            }
        }
    }
`

export const HIDE_VENDOR_LOCATION_MUTATION = gql`
    mutation HideVendorLocationMutation(
        $id: Int!
        $input: HideVendorLocationInput!
    ) {
        hideVendorLocation(id: $id, input: $input) {
            id
            locationHidden
        }
    }
`

export const BROADCAST_LOCATION_MUTATION = gql`
    mutation BroadcastLocationMutation(
        $id: Int!
        $input: BroadcastLocationInput!
    ) {
        broadcastLocation(id: $id, input: $input) {
            id
            latitude
            longitude
            locationBroadcastMode
            locationHidden
        }
    }
`

export const UPDATE_VENDOR_MARKER = gql`
    mutation UpdateVendorMarkerMutation(
        $id: Int!
        $input: UpdateVendorMarkerInput!
    ) {
        updateVendorMarker(id: $id, input: $input) {
            id
            markerUrl
        }
    }
`

export const Loading = () => <LoadingComponent />

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<VendorHomepageCellQuery>) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
    vendor,
}: CellSuccessProps<
    VendorHomepageCellQuery,
    VendorHomepageCellQueryVariables
>) => (
    <VendorHomepageContextProvider vendor={vendor}>
        <VendorHomepage />
    </VendorHomepageContextProvider>
)
