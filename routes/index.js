// routes/IndexRouter.js

const express = require('express');
const UserRouter = require('./userRouter'); // Import UserRouter
const AuthRouter = require('./authRouter'); // Import UserRouter

class IndexRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', (req, res) => {
      res.send('Welcome to the index route!');
    });

    // Use the UserRouter within the IndexRouter
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();
    this.router.use('/users', userRouter.getRouter());

    this.router.use('/auth', authRouter.getRouter());

    // Add more routes as needed
  }

  getRouter() {
    return this.router;
  }
}

module.exports = IndexRouter;
