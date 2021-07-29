const router = require('express').Router();

// mount middleware functions to specific paths
router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/verify-email', require('./verifyEmail'));
router.use(
  '/forgot-password',
  require('./forgotPassword')
);

module.exports = router;
