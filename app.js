const express = require('express');
const { createDbTerms } = require('./database/actions/createDbTerms');

// error logging - Morgan
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
// setup morgan tokens
morgan.token('status', (req, res) => {
  return res.error.statusCode;
});
morgan.token('errorMessage', (req, res) => {
  return res.error.errorMessage;
});

// create write stream for logger
const loggerStream = fs.createWriteStream(
  path.join(`${__dirname}/logs`, 'error.log'),
  {
    flags: 'a',
  }
);

// create express application
const app = express();

// to get request body in POST requests
app.use(express.json());

// CORS for cross origin requests
const cors = require('cors');
app.use(cors());

// database connection
require('./database/connection');

// populate db with terms (if empty)
createDbTerms();

// mount routes on root path
const routes = require('./routes');
app.use('/', routes);

// error handling
app.use((err, req, res, next) => {
  res.error = err;
  next(err);
});

// error handling sender
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.errorMessage });
  next(); // proceed to error logging
});

// error logging
app.use(
  morgan(
    ':date - :method - :url - status: :status - error_message: :errorMessage - :res[content-length] - :response-time ms',
    {
      stream: loggerStream,
    }
  )
);

// listen for connections on this host & port
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Pharma application listening on http://${process.env.HOST}:${process.env.PORT}`
  );
});
