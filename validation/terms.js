const Joi = require('joi');
const {
  paramsSchemaValidate,
  termBodySchemaValidate,
} = require('./schemaValidate');

const getTermsValidation = async (req, res, next) => {
  // get terms pagination - validation schema
  const getTermsSchema = Joi.object({
    from: Joi.number().integer().required().greater(0),
    size: Joi.number().integer().required().greater(0),
  });

  // validate req params
  paramsSchemaValidate(req, next, getTermsSchema);
};

const createTermValidation = (req, res, next) => {
  //create term validation schema
  const createTermSchema = Joi.object({
    key: Joi.string().required().trim(),
    label: Joi.string().required().trim(),
    synonyms: Joi.string().required().trim(),
    obo_id: Joi.string().required().trim(),
    term_editor: Joi.string().allow('').trim(),
    has_children: Joi.boolean().required(),
  });

  // validate with req body term
  termBodySchemaValidate(req, next, createTermSchema);
};

module.exports = { getTermsValidation, createTermValidation };
