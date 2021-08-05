const express = require('express');
const { createDbTerms } = require('./database/actions/createDbTerms');

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

// send error response
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.errorMessage });
});

// listen for connections on this host & port
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Pharma application listening on http://${process.env.HOST}:${process.env.PORT}`
  );
});
