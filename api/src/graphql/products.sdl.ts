export const schema = gql`
  type Product {
    id: Int!
    name: String!
    availability: Boolean!
    user: User!
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
    deleted: Boolean!
  }

  type Query {
    products: [Product!]! @requireAuth
    product(id: Int!): Product @requireAuth
    vendorProducts: [Product!]! @skipAuth
  }

  input CreateProductInput {
    name: String!
    availability: Boolean!
    userId: Int!
  }

  input UpdateProductInput {
    name: String
    availability: Boolean
    userId: Int
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: Int!, input: UpdateProductInput!): Product! @requireAuth
    deleteProduct(id: Int!): Product! @requireAuth
  }
`;
