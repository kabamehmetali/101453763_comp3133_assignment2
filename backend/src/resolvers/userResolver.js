const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const userResolver = {
  Mutation: {
    signup: async (_, { input }) => {
      const user = new User(input);
      await user.save();
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    login: async (_, { input }) => {
      const { username, password } = input;
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');
      const isValid = await user.comparePassword(password);
      if (!isValid) throw new Error('Incorrect password');
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
  },
};

module.exports = userResolver;
