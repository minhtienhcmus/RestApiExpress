// routes/UserRouter.js

const express = require('express');
const AuthController = require('../controllers/authController');

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/register', AuthController.register.bind(AuthController));
    this.router.post('/login', AuthController.login.bind(AuthController));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AuthRouter;
