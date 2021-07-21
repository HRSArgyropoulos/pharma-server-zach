const express = require('express');
const router = express.Router();
const {
  loginValidation,
} = require('../../validation/auth');
const {
  emailExists,
} = require('../../database/actions/user');
const { createToken } = require('../../services/auth');

router.post('/', async (req, res) => {
  // Validate Body
  try {
    // Returns the registration body after validation and convertion
    var { email, password } = await loginValidation(
      req.body
    );
  } catch (err) {
    return res
      .status(400)
      .send(err.details[0].message);
  }

  // Check if email exists in DB and get document
  const userDoc = await emailExists(email);
  if (!userDoc)
    return res
      .status(400)
      .send('Incorrect e-mail address');

  // Check if password does not match this user's email
  if (!(await userDoc.checkPassword(password)))
    return res.status(400).send('Invalid Password.');

  // Sign In Successfull
  // create token for this user
  const token = await createToken(userDoc);
  // send token back and in response headers
  res.header('auth-token', token).send(token);
});

module.exports = router;
