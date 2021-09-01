const express = require('express');
const { createDbTerms } = require('./database/actions/createDbTerms');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logsDir = './logs';
const helmet = require('helmet');
const compression = require('compression');
const mongooseMorgan = require('mongoose-morgan'); // log errors in db

// create express application
const app = express();

app.use(helmet());
app.use(compression());

// to get request body in POST requests
app.use(express.json());

// CORS for cross origin requests
const cors = require('cors');
app.use(cors());

// database connection
require('./database/connection');

// populate db with terms (if empty)
createDbTerms();

// setup morgan tokens
morgan.token('status', (req, res) => {
  return res?.error?.statusCode || res.statusCode;
});
morgan.token('errorMessage', (req, res) => {
  return res?.error?.errorMessage || res.statusMessage;
});

// create write stream for logger
//create dir if doesn't exist
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
const loggerStream = fs.createWriteStream(
  path.join(`${__dirname}`, '.', 'logs', 'error.log'),
  {
    flags: 'a',
  }
);

// error logging - Morgan -> FILE
app.use(
  morgan(
    ':date - :method - :url - status: :status - error_message: :errorMessage - :res[content-length] - :response-time ms',
    {
      stream: loggerStream,
      skip: (req, res) => {
        return res.statusCode < 400;
      },
    }
  )
);

// error logging - Morgan -> DB
const loggerCollection = 'logs';

// error logging - Morgan
app.use(
  mongooseMorgan(
    {
      collection: loggerCollection,
      connectionString: process.env.PHARMA_DB_URI,
    },
    {
      skip: (req, res) => {
        return res.statusCode < 400;
      },
    },
    ':date - :method - :url - status: :status - error_message: :errorMessage - :res[content-length] - :response-time ms'
  )
);

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
  next();
});

// listen for connections on this host & port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Pharma application listening on ${process.env.PORT}`);
});
