const { gql } = require('apollo-server-express');

module.exports = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    department: String!
    position: String!
    profilePicture: String
    createdAt: String
  }

  input EmployeeInput {
    firstName: String!
    lastName: String!
    email: String!
    department: String!
    position: String!
    profilePicture: String
  }

  extend type Query {
    employees(department: String, position: String): [Employee]
    employee(id: ID!): Employee
  }

  extend type Mutation {
    addEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Employee
  }
`;
