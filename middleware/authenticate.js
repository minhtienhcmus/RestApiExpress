const jwt = require('jsonwebtoken');
const process = require('process');
require('dotenv').config(); 
const secret_key = process.env.SECRET_KEY
const UserService = require('../services/userService');
const userService = new UserService();
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secret_key, { expiresIn: '1h' });
};

const verifyToken = async (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    token = token.replace("Bearer ","");
    const decoded = jwt.verify(token, secret_key);
    const user = await userService.findByPk(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { generateToken, verifyToken };