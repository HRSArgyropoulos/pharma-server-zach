const router = require('express').Router();
const { resetPasswordValidation } = require('../../validation/auth');
const {
  checkPasswordResetToken,
  setNewPassword,
} = require('../../database/actions/user');
const { hashPassword } = require('../../helpers/hashPassword');

router.post('/', async (req, res) => {
  // validate body
  try {
    // returns the body after validation and convertion
    var { token, password } = await resetPasswordValidation(req.body);
  } catch (err) {
    return res.status(400).send(err.details[0].message);
  }

  // check if token exists
  checkPasswordResetToken(token).then(async (user) => {
    // no user found with that token
    if (!user)
      return res.status(400).json({ message: 'Invalid token' });

    // user found -> update user's password
    // hash new password
    const hashedPassword = await hashPassword(password);
    // update user's new password in DB
    setNewPassword(user.email, hashedPassword).catch((err) =>
      console.log(err)
    );
    return res.status(200).json({
      message: 'Password reset successful, you can now login',
    });
  });
});

module.exports = router;
