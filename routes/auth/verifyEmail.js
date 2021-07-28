const router = require('express').Router();
const {
  verifyEmailToken,
} = require('../../database/actions/user');

router.post('/', (req, res) => {
  // get token from request body
  const { token } = req.body;
  // check if token is valid and update user to verified
  verifyEmailToken(token)
    .then((doc) => {
      // doc has value (found/not null)
      if (doc) {
        return res.status(200).json({
          message: 'Email verified',
        });
      } else {
        return res.status(400).json({
          message: 'Invalid token',
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message,
      });
    });
});

module.exports = router;
