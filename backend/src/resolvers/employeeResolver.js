const Employee = require('../models/Employee');

const employeeResolver = {
  Query: {
    employees: async (_, { department, position }, context) => {
      // Ensure user is authenticated
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      const filter = { createdBy: context.user.id };
      if (department) filter.department = department;
      if (position) filter.position = position;
      return await Employee.find(filter);
    },
    employee: async (_, { id }, context) => {
      // Ensure user is authenticated
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      // Ensure the employee belongs to the logged-in user
      const employee = await Employee.findOne({ _id: id, createdBy: context.user.id });
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    },
  },
  Mutation: {
    addEmployee: async (_, { input }, context) => {
      // Ensure user is authenticated
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      const employee = new Employee({ ...input, createdBy: context.user.id });
      return await employee.save();
    },
    updateEmployee: async (_, { id, input }, context) => {
      // Ensure user is authenticated
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      // Only update if the employee belongs to the logged-in user
      const employee = await Employee.findOneAndUpdate(
        { _id: id, createdBy: context.user.id },
        input,
        { new: true }
      );
      if (!employee) {
        throw new Error('Employee not found or unauthorized');
      }
      return employee;
    },
    deleteEmployee: async (_, { id }, context) => {
      // Ensure user is authenticated
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      // Only delete if the employee belongs to the logged-in user
      const employee = await Employee.findOneAndDelete({ _id: id, createdBy: context.user.id });
      if (!employee) {
        throw new Error('Employee not found or unauthorized');
      }
      return employee;
    },
  },
};

module.exports = employeeResolver;
