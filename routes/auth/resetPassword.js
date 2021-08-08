const router = require('express').Router();
const { resetPasswordValidation } = require('../../validation/auth');
const {
  checkPasswordResetToken,
  setNewPassword,
} = require('../../database/actions/user');
const { hashPassword } = require('../../helpers/hashPassword');

const resetPassword = async (req, res, next) => {
  // get req body after validation/convertion
  const { token, password } = req.body;

  // check if token exists
  checkPasswordResetToken(token)
    .then(async (user) => {
      // no user found with that token - invalid token
      if (!user)
        throw {
          statusCode: 400,
          errorMessage: 'Invalid token',
        };

      // user found
      // hash new password
      const hashedPassword = await hashPassword(password);
      // update user's new password in DB
      await setNewPassword(user.email, hashedPassword);
      return res.status(200).json({
        message: 'Password reset successful, you can now login',
      });
    })
    .catch((err) => next(err));
};

router.post('/', resetPasswordValidation, resetPassword);

module.exports = router;
