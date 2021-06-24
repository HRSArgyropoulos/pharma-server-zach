const express = require('express');

// create express application
const app = express();

// listen for connections on this host & port
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Pharma application listening on http://${process.env.HOST}:${process.env.PORT}`
  );
});
