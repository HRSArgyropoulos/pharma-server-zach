const express = require('express');
const router = express.Router();
const {
  registrationValidation,
} = require('../../validation/auth');
const {
  emailExists,
  saveUser,
} = require('../../database/actions/user');

// to get req.body
router.use(express.json());

// Register user
router.post('/', async (req, res) => {
  // Validate Body
  try {
    // Returns the registration body after validation and convertion
    var { firstName, lastName, email, password } =
      await registrationValidation(req.body);
  } catch (err) {
    return res
      .status(400)
      .send(err.details[0].message);
  }

  // Check if email already exists in DB
  if (await emailExists(email)) {
    return res
      .status(400)
      .send('Email Already Exists');
  }

  // Create user and save to DB
  await saveUser({
    firstName,
    lastName,
    email,
    password,
  })
    .then((doc) =>
      res.status(200).json({
        message:
          'Registration successful, please check your email for verification instructions',
      })
    )
    .catch((err) =>
      res.status(400).json({
        err,
        message: 'Cannot save user to DB',
      })
    );
});

module.exports = router;
