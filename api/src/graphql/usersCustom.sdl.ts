export const schema = gql`
    type VendorPage {
        vendors: [User!]!
        count: Int!
    }

    type UserPage {
        users: [User!]!
        count: Int!
    }

    input CustomCreateUserInput {
        email: String!
        username: String!
        name: String!
        gender: String!
        mobileNumber: String!
        roles: String
        verified: Boolean
        markerUrl: String
        password: String!
    }

    type Query {
        vendor(id: Int!): User @requireAuth
        vendorPage(page: Int, searchKey: String): VendorPage @requireAuth
        mapVendors: [User!]! @skipAuth
        userPage(limit: Int!, offset: Int!): UserPage @requireAuth
        consumerMapSearch(searchKey: String!): ConsumerMapSearchResult!
            @skipAuth
    }

    type Mutation {
        softDeleteUser(id: Int!): User! @requireAuth
        customCreateUser(input: CustomCreateUserInput!): User! @skipAuth
    }

    interface MapVendor {
        id: Int!
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
        locationBroadcastMode: LocationBroadcastMode!
    }

    input UpdateVendorMarkerInput {
        markerUrl: String!
    }

    input UpdateNameInput {
        updatedName: String!
    }

    input UpdateUsernameInput {
        updatedUsername: String!
    }

    input UpdateMobileNumberInput {
        updatedMobileNumber: String!
    }

    input UpdateEmailInput {
        updatedEmail: String!
    }

    type Mutation {
        updateName(id: Int!, input: UpdateNameInput!): User! @requireAuth
        updateUsername(id: Int!, input: UpdateUsernameInput!): User!
            @requireAuth
        updateMobileNumber(id: Int!, input: UpdateMobileNumberInput!): User!
            @requireAuth
        updateEmail(id: Int!, input: UpdateEmailInput!): User! @requireAuth
        updateUserPassword(id: Int!, input: UpdateUserPasswordInput!): User!
            @requireAuth
        deleteUserAccount(id: Int!, input: DeleteUserAccountInput!): User!
            @requireAuth
        hideVendorLocation(id: Int!, input: HideVendorLocationInput!): User!
            @requireAuth
        broadcastLocation(id: Int!, input: BroadcastLocationInput!): User!
            @requireAuth
        updateVendorMarker(id: Int!, input: UpdateVendorMarkerInput!): User!
            @requireAuth
        verifyUser(id: Int!): User! @requireAuth
        triggerMorningNotification: Boolean @requireAuth
    }

    type ConsumerMapSearchResult {
        vendors: [User!]!
        products: [Product!]!
    }
`
