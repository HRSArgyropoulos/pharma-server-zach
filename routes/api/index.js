const router = require('express').Router();

// mount middleware functions to specific paths
router.use('/', require('./terms'));
router.use('/term', require('./term'));

module.exports = router;
