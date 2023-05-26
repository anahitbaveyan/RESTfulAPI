const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthenticationMiddleware {
  static async authenticateToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ error: 'Authentication failed. Token not provided.' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication failed:', error);
      res.status(401).json({ error: 'Authentication failed' });
    }
  }
  

}

module.exports = AuthenticationMiddleware;
