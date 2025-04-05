const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      const parsedToken = token.replace('Bearer ', '');
      const decoded = jwt.verify(parsedToken, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      console.error('Invalid token');
    }
  }
  next();
};

module.exports = { verifyToken };
