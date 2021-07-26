const router = require('express').Router();

// send email verification
router.post('/', async (req, res) => {
  // get req body
  const body = req.body;
  // get token from body
  const token = body.token;
});

module.exports = router;
