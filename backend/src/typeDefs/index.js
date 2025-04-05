const { gql } = require('apollo-server-express');
const employeeTypeDefs = require('./employeeTypeDefs');
const userTypeDefs = require('./userTypeDefs');

const baseTypeDefs = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [baseTypeDefs, employeeTypeDefs, userTypeDefs];
