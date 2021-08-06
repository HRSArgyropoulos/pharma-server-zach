const schemaValidate = (req, next, schema) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    next({
      statusCode: 400,
      errorMessage: error.details[0].message,
    });
  } else {
    req.body = value;
    next();
  }
};

module.exports = schemaValidate;
