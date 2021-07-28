const router = require('express').Router();
const { User } = require('../../database/models/user');
const {
  setPasswordResetToken,
} = require('../../database/actions/user');

router.post('/', (req, res) => {
  const { email } = req.body;
  // check if email was given
  if (!email)
    return res
      .status(400)
      .json({ error: 'Email is required' });
  User.findOne({ email }, async (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ error: 'Unable to find user' });
    // check if email exists in db
    if (!user)
      return res
        .status(400)
        .json({ error: 'User not found' });
    // USER/EMAIL EXISTS
    // generate token for user
    setPasswordResetToken(user)
      .then(({ resetPasswordToken }) => {
        console.log(resetPasswordToken);
        // send email with token
      })
      .catch((err) =>
        res.status(400).json({
          error:
            'Could not generate password reset token',
        })
      );
  });
});

module.exports = router;
