const Joi = require('joi');
const { paramsSchemaValidate } = require('./schemaValidate');

const getTermsValidation = async (req, res, next) => {
  // get terms pagination - validation schema
  const getTermsSchema = Joi.object({
    from: Joi.number().integer().required().greater(0),
    size: Joi.number().integer().required().greater(0),
  });

  // validate req params
  paramsSchemaValidate(req, next, getTermsSchema);
};

module.exports = { getTermsValidation };
