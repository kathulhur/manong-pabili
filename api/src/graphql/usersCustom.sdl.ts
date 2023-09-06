export const schema = gql`
  type VendorPage {
    vendors: [User!]!
    count: Int!
  }

  type UserPage {
    users: [User!]!
    count: Int!
  }

  type Query {
    vendor(id: Int!): User @requireAuth
    vendorPage(page: Int, searchKey: String): VendorPage @requireAuth
    mapVendors: [User!]! @skipAuth
    userPage(page: Int): UserPage @requireAuth

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

  type Mutation {
    updateName(id: Int!, input: UpdateNameInput!): User! @requireAuth
    updateUsername(id: Int!, input: UpdateUsernameInput!): User! @requireAuth
    updateMobileNumber(id: Int!, input: UpdateMobileNumberInput!): User! @requireAuth
    updateUserPassword(id: Int!, input: UpdateUserPasswordInput!): User!
      @requireAuth
    deleteUserAccount(id: Int!, input: DeleteUserAccountInput!): User! @requireAuth
    hideVendorLocation(id: Int!, input: HideVendorLocationInput!): User! @requireAuth
    broadcastLocation(id: Int!, input: BroadcastLocationInput!): User! @requireAuth
    updateVendorMarker(id: Int!, input: UpdateVendorMarkerInput!): User! @requireAuth
  }
`;
