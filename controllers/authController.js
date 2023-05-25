const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


async function register(req, res) {
  try {
    
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
    
  } catch (error) {

    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = { register };