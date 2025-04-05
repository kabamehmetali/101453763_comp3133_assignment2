const Employee = require('../models/Employee');

const createEmployee = async (data) => {
  const employee = new Employee(data);
  return await employee.save();
};

const getEmployees = async (filter = {}) => {
  return await Employee.find(filter);
};

const getEmployeeById = async (id) => {
  return await Employee.findById(id);
};

const updateEmployee = async (id, data) => {
  return await Employee.findByIdAndUpdate(id, data, { new: true });
};

const deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};

module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };
