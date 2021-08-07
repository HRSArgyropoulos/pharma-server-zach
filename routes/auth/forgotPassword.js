const router = require('express').Router();
const { forgotPasswordValidation } = require('../../validation/auth');
const {
  forgotPasswordCreateToken,
} = require('../../database/actions/user');
const { sendResetPasswordEmail } = require('../../services/mailer');

const forgotPassword = async (req, res, next) => {
  // get req body after validation/convertion
  const { email } = req.body;

  // check email exists and create token
  forgotPasswordCreateToken(email)
    .then(async ({ email, resetPasswordToken }) => {
      // send email to user with token
      await sendResetPasswordEmail(
        email,
        resetPasswordToken,
        req.get('origin')
      );
      return res.status(200).json({
        message:
          'Please check your email for password reset instructions',
      });
    })
    .catch((err) => next(err));
};

router.post('/', forgotPasswordValidation, forgotPassword);

module.exports = router;
