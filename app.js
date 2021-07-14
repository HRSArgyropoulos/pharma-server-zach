const express = require('express');
const {
  createDbTerms,
} = require('./database/actions/createDbTerms');

// create express application
const app = express();

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

// listen for connections on this host & port
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Pharma application listening on http://${process.env.HOST}:${process.env.PORT}`
  );
});
