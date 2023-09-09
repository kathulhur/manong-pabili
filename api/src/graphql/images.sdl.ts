export const schema = gql`
  type Image {
    id: Int!
    title: String!
    url: String!
    user: User!
    userId: Int!
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
  }

  input CreateImageInput {
    title: String!
    url: String!
    userId: Int!
    deleted: Boolean
    deletedAt: DateTime
  }

  input UpdateImageInput {
    title: String
    url: String
    userId: Int
    deleted: Boolean
    deletedAt: DateTime
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth
  }
`;
