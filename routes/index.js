const router = require('express').Router();

// mount middleware functions to specific paths
router.use('/api', require('./api'));

module.exports = router;
