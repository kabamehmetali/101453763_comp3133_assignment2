const employeeResolver = require('./employeeResolver');
const userResolver = require('./userResolver');

const resolvers = {
  Query: {
    ...employeeResolver.Query,
  },
  Mutation: {
    ...employeeResolver.Mutation,
    ...userResolver.Mutation,
  },
};

module.exports = resolvers;
