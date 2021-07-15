const router = require('express').Router();

// mount middleware functions to specific paths
router.use('/register', require('./register'));
router.use('/login', require('./login'));

module.exports = router;
