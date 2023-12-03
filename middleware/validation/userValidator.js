const { body, validationResult } = require('express-validator');

class UserValidator {
  static validateUser() {
    return [
      // Validate 'username' field
      body('username').isString().trim().notEmpty(),

    //   // Validate 'email' field
    //   body('email').isEmail().normalizeEmail(),

      // Validate 'password' field
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

      // Check for validation errors
      (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // If there are no validation errors, proceed to the next middleware
        next();
      },
    ];
  }
}

module.exports = UserValidator;
