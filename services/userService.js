// services/UserService.js
const { User } = require('../models'); // Import your Sequelize models

class UserService {
  constructor() {
    this.User = User;
  }

  async getAllUsers() {
    try {
      const users = await this.User.findAllUsers();
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching users');
    }
  }
  async findByPk(id) {
    try {
      const users = await this.User.findByPk(id);
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching users');
    }
  }
  // Add other methods as needed
}

module.exports = UserService;