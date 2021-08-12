const Joi = require('Joi');
const { termBodySchemaValidate } = require('./schemaValidate');

const updateTermValidation = (req, res, next) => {
  // update term validation schema
  const updateTermSchema = Joi.object({
    label: Joi.string().required().trim(),
    synonyms: Joi.string().required().trim(),
    term_editor: Joi.string().allow('').trim(),
    has_children: Joi.boolean().required(),
  });

  // validate with req body term
  termBodySchemaValidate(req, next, updateTermSchema);
};

module.exports = { updateTermValidation };
