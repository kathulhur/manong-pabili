export const schema = gql`
    type MarkerPage {
        markers: [Marker!]!
        count: Int!
    }

    input MarkerPageFilterInput {
        userId: Int
    }

    type Query {
        vendorMarkers(userId: Int!): [Marker!]! @requireAuth
        markerPage(
            limit: Int!
            offset: Int!
            filter: MarkerPageFilterInput
        ): MarkerPage! @requireAuth
    }

    type Mutation {
        softDeleteMarker(id: Int!): Marker! @requireAuth
    }
`
