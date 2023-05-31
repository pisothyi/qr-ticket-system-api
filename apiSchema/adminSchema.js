const Joi = require("joi");

module.exports.signup = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.refresh = Joi.object().keys({
  refreshToken: Joi.string().required(),
});
