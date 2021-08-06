const express = require('express');
const router = express.Router();
const { loginValidation } = require('../../validation/auth');
const { loginUser } = require('../../database/actions/user');
const { createToken } = require('../../services/auth');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // login the user in
  loginUser(email, password)
    .then(async (userDoc) => {
      // create token for this user
      const token = await createToken(userDoc);
      // send email and token back (+ token in response headers)
      res
        .header('auth-token', token)
        .json({ email: userDoc.email, token });
    })
    .catch((err) => next(err));
};

router.post('/', loginValidation, login);

module.exports = router;
