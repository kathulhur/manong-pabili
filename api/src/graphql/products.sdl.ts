export const schema = gql`
  type Product {
    id: Int!
    name: String!
    availability: Boolean!
    user: User!
    userId: Int!
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
  }

  type Query {
    products: [Product!]! @requireAuth
    product(id: Int!): Product @requireAuth
  }

  input CreateProductInput {
    name: String!
    availability: Boolean!
    userId: Int!
    deleted: Boolean
    deletedAt: DateTime
  }

  input UpdateProductInput {
    name: String
    availability: Boolean
    userId: Int
    deleted: Boolean
    deletedAt: DateTime
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: Int!, input: UpdateProductInput!): Product! @requireAuth
    deleteProduct(id: Int!): Product! @requireAuth
  }
`;
