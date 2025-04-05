const User = require('../models/User');

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

module.exports = { createUser, findUserByUsername };
