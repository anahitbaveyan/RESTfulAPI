const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { registerValidationRules, loginValidationRules } = require('../validator/authValidator');
const ValidationMiddleware = require('../middlewares/validationMiddleware');
const AuthenticationMiddleware = require('../middlewares/authenticationMiddleware');


// Registration route
router.post('/register', registerValidationRules(), ValidationMiddleware.validate, AuthController.register);

// Login route
router.post('/login', loginValidationRules(), ValidationMiddleware.validate, AuthController.login);


router.get('/authenticated-user', AuthenticationMiddleware.authenticateToken, AuthController.getAuthenticatedUser);

module.exports = router;
