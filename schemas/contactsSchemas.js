const Joi = require('joi');

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255),
  email: Joi.string().email(),
  phone: Joi.string(),
});

module.exports = {
  contactUpdateSchema,
};
