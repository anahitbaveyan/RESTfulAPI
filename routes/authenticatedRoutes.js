const express = require('express');
const { authenticate } = require('../middlewares/authenticationMiddleware');
const { getAuthenticatedUser } = require('../controllers/authenticatedUserController');

const router = express.Router();

router.get('/authenticated-user', authenticate, getAuthenticatedUser);



module.exports = router;
