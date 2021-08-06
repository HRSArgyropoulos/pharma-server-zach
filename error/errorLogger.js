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
  path.join(`${__dirname}`, '..', 'logs', 'error.log'),
  {
    flags: 'a',
  }
);

module.exports = loggerStream;
