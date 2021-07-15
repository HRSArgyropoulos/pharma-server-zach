const router = require('express').Router();

// mount middleware functions to specific paths
router.use('/register', require('./register'));

module.exports = router;
