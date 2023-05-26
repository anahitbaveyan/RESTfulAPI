const User = require('../models/user')
const bcrypt = require('bcrypt');
const AuthService = require('../service/authService')

class AuthController {
    static async register(req, res) {
      try {
        const { username, email, password } = req.body;
  
        const existingUser = await AuthService.findUserByEmail(email);
        if (existingUser) {
          return res.status(409).json({ error: 'User already exists' });
        }
  
        const user = await AuthService.createUser(username, email, password);
        res.json({ message: 'User registered successfully', user });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    static async login(req, res) {
      try {
        const { email, password } = req.body;
  
        const user = await AuthService.authenticateUser(email, password);
  
        const token = AuthService.generateToken(user.email);
        res.json({ message: 'Login successful', token });
      } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
      }
    }
  
    static getAuthenticatedUser(req, res) {
      const { username, email } = req.user;
      res.json({ message: 'Authentication successful', user: { username, email } });
    }
  }


module.exports = AuthController;
