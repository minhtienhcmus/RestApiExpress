// routes/UserRouter.js

const express = require('express');
const AuthController = require('../controllers/authController');
const UserValidator = require('../middleware/validation/userValidator');

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/register', UserValidator.validateUser(),AuthController.register.bind(AuthController));
    this.router.post('/login', UserValidator.validateUser(), AuthController.login.bind(AuthController));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AuthRouter;
