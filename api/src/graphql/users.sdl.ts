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
    role: String!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
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
    role: String!
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
    role: String
  }

  input UpdateUserPasswordInput {
    newPassword: String!
    oldPassword: String!
  }

  input DeleteUserAccountInput {
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    updateUserPassword(id: Int!, input: UpdateUserPasswordInput!): User!
      @requireAuth
    deleteUser(id: Int!): User! @requireAuth

  }
`;
