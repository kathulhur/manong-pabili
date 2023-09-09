export const schema = gql`
  type ImagePage {
    images: [Image!]!
    count: Int!
  }

  input ImagePageFilterInput {
    userId: Int
  }


  type Query {
    imagePage(page: Int, filter: ImagePageFilterInput): ImagePage! @requireAuth
    vendorImages(userId: Int!): [Image!]! @requireAuth
  }

  type Mutation {
    softDeleteImage(id: Int!): Image! @requireAuth
  }
`;
