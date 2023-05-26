const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map((error) => error.msg);
  return res.status(400).json({ errors: errorMessages });
};

module.exports = { validate };