export const schema = gql`
  type User {
    id: Int!
    email: String
    username: String!
    name: String
    mobileNumber: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    products: [Product]!
    latitude: Float
    longitude: Float
    verified: Boolean
    lastLocationUpdate: DateTime
    locationHidden: Boolean
    roles: String!
    markerUrl: String
    deleted: Boolean
    deletedAt: DateTime
  }

  type VendorPage {
    vendors: [User!]!
    count: Int!
  }


  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
    vendor(id: Int!): User @requireAuth
    vendorPage(page: Int): VendorPage @requireAuth
    mapVendors: [User!]! @skipAuth
    vendorProducts: [Product!]! @skipAuth
  }

  input CreateUserInput {
    email: String
    username: String!
    name: String
    mobileNumber: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    latitude: Float
    longitude: Float
    verified: Boolean
    roles: String!
    markerUrl: String
  }

  input UpdateUserInput {
    email: String
    username: String
    name: String
    mobileNumber: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    latitude: Float
    longitude: Float
    verified: Boolean
    roles: String
    markerUrl: String
  }

  input UpdateUserPasswordInput {
    newPassword: String!
    oldPassword: String!
  }

  input DeleteUserAccountInput {
    password: String!
  }

  input HideVendorLocationInput {
    channel: String!
    event: String!
  }

  input BroadcastLocationInput {
    channel: String!
    event: String!
    latitude: Float!
    longitude: Float!
  }

  input UpdateVendorMarkerInput {
    markerUrl: String!
  }



  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    updateUserPassword(id: Int!, input: UpdateUserPasswordInput!): User!
      @requireAuth
    deleteUserAccount(id: Int!, input: DeleteUserAccountInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    hideVendorLocation(id: Int!, input: HideVendorLocationInput!): User! @requireAuth
    broadcastLocation(id: Int!, input: BroadcastLocationInput!): User! @requireAuth
    updateVendorMarker(id: Int!, input: UpdateVendorMarkerInput!): User! @requireAuth
  }
`;
