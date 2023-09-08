export const schema = gql`
  type Image {
    id: Int!
    title: String!
    url: String!
    user: User!
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
    deleted: Boolean!
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
  }

  input CreateImageInput {
    title: String!
    url: String!
    userId: Int!
  }

  input UpdateImageInput {
    title: String
    url: String
    userId: Int
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth
  }
`;
