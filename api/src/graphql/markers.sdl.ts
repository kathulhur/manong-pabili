export const schema = gql`
  type Marker {
    id: Int!
    url: String!
    user: User!
    userId: Int!
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
  }

  type Query {
    markers: [Marker!]! @requireAuth
    marker(id: Int!): Marker @requireAuth
  }

  input CreateMarkerInput {
    url: String!
    userId: Int!
    deleted: Boolean
    deletedAt: DateTime
  }

  input UpdateMarkerInput {
    url: String
    userId: Int
    deleted: Boolean
    deletedAt: DateTime
  }

  type Mutation {
    createMarker(input: CreateMarkerInput!): Marker! @requireAuth
    updateMarker(id: Int!, input: UpdateMarkerInput!): Marker! @requireAuth
    deleteMarker(id: Int!): Marker! @requireAuth
  }
`;
