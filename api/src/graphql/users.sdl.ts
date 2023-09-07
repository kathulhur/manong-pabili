export const schema = gql`
  type User {
    id: Int!
    email: String
    username: String!
    name: String
    gender: String
    mobileNumber: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    products: [Product]!
    latitude: Float
    longitude: Float
    roles: String!
    lastLocationUpdate: DateTime
    locationHidden: Boolean!
    verified: Boolean!
    markerUrl: String
    deleted: Boolean!
    deletedAt: DateTime
    featuredImages: [Image]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String
    username: String!
    name: String
    gender: String
    mobileNumber: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    latitude: Float
    longitude: Float
    roles: String!
    lastLocationUpdate: DateTime
    locationHidden: Boolean!
    verified: Boolean!
    markerUrl: String
    deleted: Boolean!
    deletedAt: DateTime
  }

  input UpdateUserInput {
    email: String
    username: String
    name: String
    gender: String
    mobileNumber: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    latitude: Float
    longitude: Float
    roles: String
    lastLocationUpdate: DateTime
    locationHidden: Boolean
    verified: Boolean
    markerUrl: String
    deleted: Boolean
    deletedAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`;
