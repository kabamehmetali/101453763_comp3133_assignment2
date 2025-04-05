const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
  }

  input UserInput {
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
    signup(input: UserInput!): AuthPayload
    login(input: UserInput!): AuthPayload
  }
`;
