const Joi = require('joi');

const registrationValidation = async (body) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  // by Srinivas & Wiktor Stribiżew
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const registerSchema = Joi.object({
    firstName: Joi.string().min(2).required().trim(),
    lastName: Joi.string().min(2).required().trim(),
    email: Joi.string()
      .min(5)
      .required()
      .email()
      .trim(),
    password: Joi.string()
      .required()
      .pattern(passwordRegex)
      .message('Password did not match the criteria'),
    confirmPassword: Joi.ref('password'),
  }).with('password', 'confirmPassword');

  return registerSchema.validateAsync(body);
};

const loginValidation = async (body) => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .min(5)
      .required()
      .email()
      .trim(),
    password: Joi.string().required(),
  });

  return loginSchema.validateAsync(body);
};

module.exports = {
  registrationValidation,
  loginValidation,
};
