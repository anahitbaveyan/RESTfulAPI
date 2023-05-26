const getAuthenticatedUser = (req, res) => {
    const { username, email } = req.user;
    res.json({ message: 'Authentication successful', user: { username, email } });
  };
module.exports = { getAuthenticatedUser };
