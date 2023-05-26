const { body } = require('express-validator');

// Register validation rules
const registerValidationRules = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password')
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Login validation rules
const loginValidationRules = [
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { registerValidationRules, loginValidationRules };
