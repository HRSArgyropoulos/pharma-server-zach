const bodySchemaValidate = (req, next, schema) => {
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

const paramsSchemaValidate = (req, next, schema) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    next({
      statusCode: 400,
      errorMessage: error.details[0].message,
    });
  } else {
    req.query = value;
    next();
  }
};

const termBodySchemaValidate = (req, next, schema) => {
  const { error, value } = schema.validate(req.body.term);
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

module.exports = {
  bodySchemaValidate,
  paramsSchemaValidate,
  termBodySchemaValidate,
};
