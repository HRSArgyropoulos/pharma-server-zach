const router = require('express').Router();

// get all the middleware functions
const api = require('./api');
const auth = require('./auth');

// mount middleware functions to specific paths
router.use('/api', api);
router.use('/auth', auth);

module.exports = router;
