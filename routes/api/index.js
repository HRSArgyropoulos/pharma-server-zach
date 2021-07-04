const router = require('express').Router();

// mount middleware functions to specific paths
router.use('/', require('./terms'));

module.exports = router;
