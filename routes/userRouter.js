// routes/UserRouter.js

const express = require('express');
const UserController = require('../controllers/userController');
const { generateToken,verifyToken } = require("../middleware/authenticate");
class UserRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/',verifyToken, UserController.getAllUsers.bind(UserController));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = UserRouter;
