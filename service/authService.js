const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthService {
  static generateToken(email) {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  static async hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  static async comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async createUser(username, email, password) {
    const hashedPassword = await this.hashPassword(password);
    return await User.create({ username, email, password: hashedPassword });
  }

  static async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async authenticateUser(email, password) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    return user;
  }
}

module.exports = AuthService;
