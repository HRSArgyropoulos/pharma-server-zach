const router = require('express').Router();

// mount middleware functions to specific paths
router.use('/api', require('./api'));
router.use('/auth', require('./auth'));
router.get('/', (_, res, next) => {
  res.status(200).send(`
  <div style="padding: 10px 20px;">
    <h2>Welcome to Pharma API.</h2>
    <p style="max-width:500px; font-size:1.1em;">You can either demo this api by visiting the client <a target="_blank" href="https://pharma-client-react.herokuapp.com/">here</a> which hits this api to provide data and functionality to the application.
    <br> or <br>
    you can hit the specific endpoints in this api as stated in swagger, which can be found <a target="_blank" href="https://github.com/HRSArgyropoulos/pharma-react/blob/main/config/swagger.yaml">here</a>. 
    </p>
  </div>
  `);
});

module.exports = router;
