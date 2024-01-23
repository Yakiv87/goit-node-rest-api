const { HttpError } = require('./HttpError');

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(new HttpError(400, error.message));
  }
  next();
};

module.exports = { validateBody };
