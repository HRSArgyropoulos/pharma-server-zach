const Joi = require('joi');
const schemaValidate = require('./schemaValidate');

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
// by Srinivas & Wiktor Stribiżew
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registrationValidation = async (req, res, next) => {
  // registration validation schema
  const registerSchema = Joi.object({
    firstName: Joi.string().min(2).required().trim(),
    lastName: Joi.string().min(2).required().trim(),
    email: Joi.string().min(5).required().email().trim(),
    password: Joi.string()
      .required()
      .pattern(passwordRegex)
      .message('Password did not match the criteria'),
    confirmPassword: Joi.ref('password'),
  }).with('password', 'confirmPassword');

  // validate req body
  schemaValidate(req, next, registerSchema);
};

const loginValidation = async (req, res, next) => {
  // login validation schema
  const loginSchema = Joi.object({
    email: Joi.string().min(5).required().email().trim(),
    password: Joi.string().required(),
  });

  // validate req body
  schemaValidate(req, next, loginSchema);
};

const resetPasswordValidation = async (body) => {
  const passwordResetSchema = Joi.object({
    token: Joi.string().required().trim(),
    password: Joi.string()
      .required()
      .pattern(passwordRegex)
      .message('Password did not match the criteria'),
    confirmPassword: Joi.ref('password'),
  }).with('password', 'confirmPassword');

  return passwordResetSchema.validateAsync(body);
};

module.exports = {
  registrationValidation,
  loginValidation,
  resetPasswordValidation,
};
