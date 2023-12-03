// controllers/UserController.js
const UserService = require('../services/userService');
const { logger } = require("../middleware/logger");
class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json({ success: true, users });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  // Add other route handling methods as needed
}

module.exports = new UserController();
