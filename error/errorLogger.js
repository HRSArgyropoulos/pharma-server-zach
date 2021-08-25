// error logging - Morgan
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const logsDir = '../logs';

// setup morgan tokens
morgan.token('status', (req, res) => {
  return res.error.statusCode;
});
morgan.token('errorMessage', (req, res) => {
  return res.error.errorMessage;
});

// create write stream for logger
//create dir if doesn't exist
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
const loggerStream = fs.createWriteStream(
  path.join(`${__dirname}`, '..', 'logs', 'error.log'),
  {
    flags: 'a',
  }
);

module.exports = loggerStream;
