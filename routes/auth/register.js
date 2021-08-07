const express = require('express');
const router = express.Router();
const { registrationValidation } = require('../../validation/auth');
const { registerUser } = require('../../database/actions/user');
const { sendVerificationEmail } = require('../../services/mailer');

const register = async (req, res, next) => {
  // get req body from previous middleware (validation/convertion)
  const { firstName, lastName, email, password } = req.body;

  // register user in DB
  registerUser(firstName, lastName, email, password)
    .then(async (user) => {
      // send verification email
      await sendVerificationEmail(user, req.get('origin'));
      return res.status(200).json({
        message:
          'Registration successful, please check your email for verification instructions',
      });
    })
    .catch((err) => next(err));
};

router.post('/', registrationValidation, register);

module.exports = router;
