const router = require('express').Router();

// mount middleware functions to specific paths
router.use('/getTerms', require('./getTerms'));

module.exports = router;
