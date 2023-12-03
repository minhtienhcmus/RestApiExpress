// controllers/UserController.js
const UserService = require('../services/userService');
const AuthService = require('../services/authService');
class AuthController {
  constructor() {
    // this.userService = new UserService();
    this.authService = new AuthService();
  }

  async register(req, res) {
    try {
        
        const { username, password } = req.body;
        const auth =  await this.authService.register(username, password);
        if(auth.hasOwnProperty('is_exist')){
          res.status(400).json({"message": `${username} is existed in system`});
        } else {
          res.status(200).json(auth);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
      }
  }
  async login(req, res) {
    try {
        
        const { username, password } = req.body;
        const auth =  await this.authService.login(username, password);

        res.status(auth.status).json(auth);
   
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
      }
  }

  // Add other route handling methods as needed
}

module.exports = new AuthController();
