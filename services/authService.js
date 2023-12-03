// services/UserService.js
const { User, Token } = require("../models"); // Import your Sequelize User model
const { generateToken } = require("../middleware/authenticate");
const bcrypt = require("bcrypt");
const { logger } = require("../middleware/logger");
class AuthService {
  constructor() {
    this.User = User; // Assuming you pass the Sequelize User model to the service
    this.Token = Token;
  }

  async register(username, password) {
    try {
      // check user Exist
      const user = await this.User.findOne({ where: { username } });

      if (user) {
        return { is_exist: true };
      } else {
        const users = await this.User.createUser(username, password);
        // console.log("users====",users.id)
        const token = generateToken(users.id);
        await this.Token.createToken(token, users.id);

        return { username: users.username, token: token };
      }
    } catch (error) {
      logger.error(error);
      throw new Error("Error fetching users");
    }
  }

  async login(username, password) {
    try {
      // check user Exist
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return { status: 401, message: "Invalid credentials" };
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Passwords match, proceed with login
          // Generate a JWT token for the authenticated user
          const token = generateToken(user.id);
          return { status: 200, token: token };
        } else {
          return { status: 401, message: "Invalid credentials" };
        }
      }
    } catch (error) {
      logger.error(error);
      return { status: 500, message: "server Error" };
      // throw new Error("Error fetching users");
    }
  }
  // Add other methods as needed
}

module.exports = AuthService;
