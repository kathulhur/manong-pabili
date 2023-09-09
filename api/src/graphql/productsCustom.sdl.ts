export const schema = gql`
    type ProductPage {
        products: [Product!]!
        count: Int!
    }

    input ProductPageFilterInput {
        userId: Int
    }

    type Query {
        productsByUser(userId: Int!): [Product!]! @requireAuth
        productPage(page: Int, filter: ProductPageFilterInput): ProductPage @requireAuth
        vendorProducts: [Product!]! @skipAuth
    }

    type Mutation {
        softDeleteProduct(id: Int!): Product @requireAuth
    }



`
