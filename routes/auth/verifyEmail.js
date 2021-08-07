const router = require('express').Router();
const { verifyEmailValidation } = require('../../validation/auth');
const { verifyEmailToken } = require('../../database/actions/user');

const verifyEmail = async (req, res, next) => {
  // get token from req body
  const { token } = req.body;

  // check if token is valid and update user to verified
  verifyEmailToken(token)
    .then((doc) => {
      // doc has value (found/not null)
      if (doc) {
        return res.status(200).json({
          message: 'Verification successful, you can now login',
        });
      } else {
        throw {
          statusCode: 400,
          errorMessage: 'Verification failed',
        };
      }
    })
    .catch((err) => next(err));
};

router.post('/', verifyEmailValidation, verifyEmail);

module.exports = router;
