const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

// Create a new product
const createUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  type: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  createUserValidator,
};
