const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidationRules, loginValidationRules } = require('../validator/authValidator');
const { validate } = require('../middlewares/validationMiddleware');

router.post('/register',  registerValidationRules, validate, register);
router.post('/login',  loginValidationRules, validate, login);


module.exports = router;
