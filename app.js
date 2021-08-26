const express = require('express');
const { createDbTerms } = require('./database/actions/createDbTerms');
const morgan = require('morgan');
const loggerStream = require('./error/errorLogger'); // Morgan tokens / error logger
const helmet = require('helmet');
const compression = require('compression');

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

// error logging - Morgan
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
