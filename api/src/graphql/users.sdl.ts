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
  }

  type VendorPage {
    vendors: [User!]!
    count: Int!
  }


  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
    vendorPage(page: Int): VendorPage @requireAuth
    mapVendors: [User!]! @skipAuth
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

  fragment VendorFragment on User {
    id
    name
    username
    latitude
    longitude
    products {
      id
      name
    }

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
  }
`;
