const Joi = require('Joi');
const { bodySchemaValidate } = require('./schemaValidate');

const updateTermValidation = (req, res, next) => {
  // update term validation schema
  const updateTermSchema = Joi.object({
    key: Joi.string().required().trim(),
    label: Joi.string().required().trim(),
    synonyms: Joi.string().required().trim(),
    obo_id: Joi.string().required().trim(),
    term_editor: Joi.string().required().trim(),
    has_children: Joi.boolean().required(),
  });

  // validate with req body
  bodySchemaValidate(req, next, updateTermSchema);
};

module.exports = { updateTermValidation };
